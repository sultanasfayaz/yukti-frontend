import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

// ✅ Validation regex
const nameRegex = /^[A-Za-z\s]+$/;
const usnRegex = /^[1-9][A-Z]{2}\d{2}[A-Z]{2}\d{3}$/; // e.g., 1AB23CD456
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

const Register = () => {
  const [formData, setFormData] = useState({
    event: '',
    name: '',
    groupName: '',
    USN: '',
    college: '',
    department: '',
    year: '',
    email: '',
    phone: ''
  });

  const [members, setMembers] = useState([{ name: '', usn: '' }]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactionId: '',
    amount: '',
    paymentMethod: ''
  });

  // ✅ Group event member limits
  const memberLimits = {
    skit: { min: 5, max: 8 },
    mime: { min: 6, max: 8 },
    dumb_charades: { min: 2, max: 2 },
    fashion_show: { min: 12, max: 15 },
    group_dance: { min: 6, max: 8 },
    group_singing: { min: 6, max: 6 },
    mad_ads: { min: 5, max: 5 },
    gyan_thantra: { min: 2, max: 2 },
    roadies: { min: 3, max: 3 },
    new_product_launch: { min: 3, max: 5 }
  };

  const isGroupEvent = Object.keys(memberLimits).includes(formData.event);
  const currentLimit = memberLimits[formData.event] || {};

  // ✅ Handle member input
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMemberField = () => {
    if (currentLimit.max && members.length >= currentLimit.max) return;
    setMembers([...members, { name: '', usn: '' }]);
  };

  const removeMemberField = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.event) newErrors.event = 'Please select an event';

    if (isGroupEvent) {
      if (!formData.groupName.trim()) {
        newErrors.groupName = 'Group name is required';
      } else if (!nameRegex.test(formData.groupName)) {
        newErrors.groupName = 'Group name should contain only letters';
      }
    } else {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (!nameRegex.test(formData.name)) {
        newErrors.name = 'Name should contain only letters';
      }

      if (!formData.USN.trim()) {
        newErrors.USN = 'USN is required';
      } else if (!usnRegex.test(formData.USN)) {
        newErrors.USN = 'Invalid USN format';
      }
    }

    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.year) newErrors.year = 'Please select year';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // ✅ Validate group members
    if (isGroupEvent) {
      if (members.length < currentLimit.min || members.length > currentLimit.max) {
        newErrors.membersCount = `This event requires ${currentLimit.min} to ${currentLimit.max} members.`;
      }
      members.forEach((m, i) => {
        if (!m.name.trim() || !m.usn.trim()) {
          newErrors[`member_${i}`] = `Member ${i + 1}: Name and USN are required`;
        } else {
          if (!nameRegex.test(m.name)) {
            newErrors[`member_${i}_name`] = `Member ${i + 1}: Invalid name`;
          }
          if (!usnRegex.test(m.usn)) {
            newErrors[`member_${i}_usn`] = `Member ${i + 1}: Invalid USN`;
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Step navigation
  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) setShowPayment(true);
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const resetAll = () => {
    setFormData({
      event: '',
      name: '',
      groupName: '',
      USN: '',
      college: '',
      department: '',
      year: '',
      email: '',
      phone: ''
    });
    setMembers([{ name: '', usn: '' }]);
    setPaymentData({ transactionId: '', amount: '', paymentMethod: '' });
    setErrors({});
    setShowPayment(false);
  };

  // ✅ Final submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        name: isGroupEvent ? formData.groupName : formData.name,
        members,
        payment: paymentData
      };

      const res = await axios.post(
        'https://yukti-backend-foko.onrender.com/api/register',
        payload
      );
      
      const { message, uniqueId, emailSent } = res.data;

    if (emailSent) {
      alert(`${message}\n\n✅ Your Unique ID: ${uniqueId}\n📧 Confirmation email has been sent.`);
    } else {
      alert(`${message}\n\n✅ Your Unique ID: ${uniqueId}\n⚠️ Email could not be sent, please note down your ID.`);
    }

      resetAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Submission failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {!showPayment ? (
        <form onSubmit={handleNext} className="register-form">
          <h2>Event Registration</h2>
          <hr />
          <p className="fees"><b>Solo Event - ₹150</b></p>
          <p className="fees"><b>Group Events - ₹600</b></p>

          {/* Event */}
          <label>Event</label>
          <select
            className="colored-input"
            value={formData.event}
            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
          >
            <option value="">-- Select Event --</option>
            <optgroup label="Entertainment">
              <option value="skit">Skit</option>
              <option value="mime">Mime</option>
              <option value="dumb_charades">Dumb Charades</option>
              <option value="fashion_show">Fashion Show</option>
            </optgroup>
            <optgroup label="Art">
              <option value="painting">Painting</option>
              <option value="photography">Photography</option>
              <option value="rangoli">Rangoli</option>
              <option value="collage">Collage</option>
            </optgroup>
            <optgroup label="Music/Dance">
              <option value="group_dance">Group Dance</option>
              <option value="group_singing">Group Singing</option>
              <option value="solo_dance">Solo Dance</option>
              <option value="solo_singing">Solo Singing</option>
              <option value="standup_comedy">Stand-up Comedy</option>
            </optgroup>
            <optgroup label="TechnoMa">
              <option value="mad_ads">Mad Ads</option>
              <option value="gyan_thantra">Gyan Thantra</option>
              <option value="roadies">Roadies</option>
              <option value="new_product_launch">New Product Launch</option>
            </optgroup>
          </select>
          {errors.event && <span className="error">{errors.event}</span>}

          {/* Solo / Group inputs */}
          {isGroupEvent ? (
            <>
              <label>Group Name</label>
              <input
                type="text"
                className="colored-input"
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
              />
              {errors.groupName && <span className="error">{errors.groupName}</span>}
            </>
          ) : (
            <>
              <label>Name</label>
              <input
                type="text"
                className="colored-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="error">{errors.name}</span>}

              <label>USN</label>
              <input
                type="text"
                className="colored-input"
                value={formData.USN}
                onChange={(e) => setFormData({ ...formData, USN: e.target.value })}
              />
              {errors.USN && <span className="error">{errors.USN}</span>}
            </>
          )}

          {/* Common fields */}
          <label>College</label>
          <input
            type="text"
            className="colored-input"
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          />
          {errors.college && <span className="error">{errors.college}</span>}

          <label>Department</label>
          <select
            className="colored-input"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">-- Select Department --</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
            <option value="MTech">MTech</option>
            <option value="BE">BE</option>
            <option value="MA">MA</option>
          </select>
          {errors.department && <span className="error">{errors.department}</span>}

          <label>Year of Study</label>
          <select
            className="colored-input"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          >
            <option value="">-- Select Year --</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          {errors.year && <span className="error">{errors.year}</span>}

          <label>Email</label>
          <input
            type="email"
            className="colored-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Phone</label>
          <input
            type="tel"
            className="colored-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Group Members */}
          {isGroupEvent && (
            <>
              <label>Group Members</label>
              {members.map((member, index) => (
                <div key={index} className="member-input">
                  <input
                    type="text"
                    placeholder="Member Name"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="USN"
                    value={member.usn}
                    onChange={(e) => handleMemberChange(index, 'usn', e.target.value)}
                  />
                  {members.length > 1 && (
                    <button type="button" onClick={() => removeMemberField(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addMemberField}>
                Add Member
              </button>
              {errors.membersCount && <span className="error">{errors.membersCount}</span>}
            </>
          )}

          <button type="submit">Next</button>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="payment-form">
          <h2>Payment Details</h2>
          <p className="fees"><b>Solo Event - ₹150</b></p>
          <p className="fees"><b>Group Events - ₹600</b></p>
          <p className="bank">Bank account number: <b>XXXX-XXXX-XXXX</b></p>
          <p className="bank">IFSC code: <b>XXXX0001234</b></p>

          <label>Transaction ID</label>
          <input
            type="text"
            name="transactionId"
            value={paymentData.transactionId}
            onChange={handlePaymentChange}
          />

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handlePaymentChange}
          />

          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={paymentData.paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="">-- Select Method --</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" onClick={resetAll}>Reset</button>
          <button type="button" onClick={() => setShowPayment(false)}>Back</button>
        </form>
      )}
    </div>
  );
};

export default Register;
