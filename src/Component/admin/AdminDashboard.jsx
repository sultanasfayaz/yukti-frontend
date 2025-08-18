import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/registrations', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRegistrations(res.data))
      .catch(() => alert('Unauthorized or session expired!'));
  }, [token]);

  // Find duplicate transaction IDs
  const getDuplicateTransactions = () => {
    const transactionCount = {};
    registrations.forEach(r => {
      const id = r.payment?.transactionId;
      if (id) {
        transactionCount[id] = (transactionCount[id] || 0) + 1;
      }
    });
    return Object.keys(transactionCount).filter(id => transactionCount[id] > 1);
  };

  const duplicateTransactionIds = getDuplicateTransactions();

  const renderNameOrGroup = (r) => {
    if (r.members && r.members.length > 0) {
      // Group Event: Show Group Name + Members
      return (
        <>
          <strong>{r.groupName}</strong>
          <ul style={{ margin: 0, paddingLeft: "15px" }}>
            {r.members.map((m, idx) => (
              <li key={idx}>{m.name} ({m.usn})</li>
            ))}
          </ul>
        </>
      );
    }
    // Solo Event
    return r.name;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registered Users</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1">
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Name / Group</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Event</th>
            <th>Transaction ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r, i) => {
            const transactionId = r.payment?.transactionId || 'N/A';
            const isDuplicate = duplicateTransactionIds.includes(transactionId);
            return (
              <tr key={i}>
                <td>{renderNameOrGroup(r)}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.event}</td>
                <td style={{ color: isDuplicate ? 'red' : 'black', fontWeight: isDuplicate ? 'bold' : 'normal' }}>
                  {transactionId}
                </td>
                <td>{new Date(r.date).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
