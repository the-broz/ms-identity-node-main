/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

var fetch = require('../fetch');

var { GRAPH_ME_ENDPOINT, GRAPH_PFP_ENDPOINT } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims , isAuthenticated: req.session.isAuthenticated, username: req.session.account?.name});
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('profile', { profile: graphResponse, isAuthenticated: req.session.isAuthenticated, username: req.session.account?.name});
        } catch (error) {
            next(error);
        }
    }
);

router.get('/pfp', isAuthenticated, async function (req, res, next) {
    try {
        const graphResponse = await fetch(GRAPH_PFP_ENDPOINT, req.session.accessToken, { responseType: 'arraybuffer' });
        const avatar = Buffer.from(graphResponse, 'binary').toString('base64');
        res.render('pfp', { imageData: 'data:image/jpeg;base64,' + avatar , isAuthenticated: req.session.isAuthenticated, username: req.session.account?.name});
    } catch (error) {
        next(error);
    }
});


module.exports = router;
