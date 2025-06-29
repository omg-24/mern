const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup,login } = require('../Controllers/AuthController'); 
const router = express.Router();


//           path      validation    controller
router.post('/login',loginValidation,login);
router.post('/signup', signupValidation, signup);

module.exports = router;