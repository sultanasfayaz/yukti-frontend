const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { name, email, password, college } = req.body;
  console.log('📩 Received Registration:', req.body);
  // You can add MongoDB logic here
  res.send('✅ Registration successful!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
