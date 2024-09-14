// server/routes/users.js
const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUser, getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, getCurrentUser);
router.put('/me', auth, updateUser);
router.get('/', auth, getUsers);

module.exports = router;