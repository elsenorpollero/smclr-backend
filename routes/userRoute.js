const express = require('express');
const { getAllUsers } = require('../controllers/user');
const {validateToken} = require('../middleware/auth/auth')


const router = express.Router();

// Route for get All Users
router.get('/getAllUsers',validateToken, getAllUsers);



module.exports = router;
