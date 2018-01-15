var request = require('request');
var express = require('express');
var router = express.Router();
var stubData = require('../tools/stubData.js');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BlogContent = require('../models/blogcontent');

/** /api_call **/
router.get('/blogHTML', function (req, res) {
    console.log("API: blogHTML");
    var stubDataHTML = stubData.getBlogHTML();

    let blogContent = new BlogContent();
    blogContent.name = stubDataHTML;
    blogContent.id = "1";

    blogContent.save((err, blogContent) => {
        if (err) {
            console.log(`*** CustomersRepository insertCustomer error: ${err}`);
        }
        console.log(blogContent.name);
    });

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