const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controller/auth.controller');
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup');

//Sign up end point

router.post('/signup', checkDuplicateUsernameOrEmail, signUp);

//Sign in end point

router.post('/login', signIn);

module.exports = router;
