var request = require('request');
var express = require('express');
var router = express.Router();
var stubData = require('../tools/stubData.js')

/** /api_call **/
router.get('/blogHTML', function (req, res) {
    console.log("API: blogHTML");
    var stubDataHTML = stubData.getBlogHTML();
    return res.json({ bloghtml: stubDataHTML, statusCode: 200 });
});

router.get('/blogHTMLWithImage', function (req, res) {
    console.log("API: blogHTML");
    var stubDataHTML = stubData.getBlogHTMLWithImage();
    return res.json({ bloghtml: stubDataHTML, statusCode: 200 });
});

router.get('/blogHTMLWithImageVideo', function (req, res) {
    console.log("API: blogHTML");
    var stubDataHTML = stubData.getBlogHTMLWithImageVideo();
    return res.json({ bloghtml: stubDataHTML, statusCode: 200 });
});

module.exports = router;