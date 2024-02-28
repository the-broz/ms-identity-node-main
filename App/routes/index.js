/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
const authProvider = require('../auth/AuthProvider');
const { GRAPH_PFP_ENDPOINT, REDIRECT_URI} = require('../authConfig');
const fetch = require('../fetch');
var router = express.Router();


router.get('/',async function (req, res, next) {
    let avatar
    if (req.session.accessToken != null){
    const graphResponse = await fetch(GRAPH_PFP_ENDPOINT, req.session.accessToken, { responseType: 'arraybuffer' });
    avatar = Buffer.from(graphResponse, 'binary').toString('base64');
}
 res.render('index', {
        title: 'LSCHS Companion Dashboard',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.name,
        avatar: 'data:image/jpeg;base64,' + avatar
    });
});


module.exports = router;
