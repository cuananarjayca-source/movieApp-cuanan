const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controllers/userController');
const { authAdmin, authUser } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/details', authUser, getUserDetails);

module.exports = router;