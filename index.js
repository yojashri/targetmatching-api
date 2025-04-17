const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Root route (optional)
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read users.json file
  const usersFilePath = path.join(__dirname, 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(usersFilePath));

  // Check credentials
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({
      message: 'Login successful',
      token: 'mock-token-user1'  // Replace with JWT later if needed
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
