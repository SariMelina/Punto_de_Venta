const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggerIn } = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup'
}));

router.get('/signin', isNotLoggerIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggerIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;