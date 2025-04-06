const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load users
const loadUsers = () => {
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (error) {
        return [];
    }
};

// Save users
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

// Register Endpoint
app.post('/register', (req, res) => {
    const { name, mobile, address, username, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.json({ success: false, message: "Passwords do not match" });
    }

    const users = loadUsers();
    
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: "Username already exists" });
    }

    users.push({ name, mobile, address, username, password });
    saveUsers(users);

    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));