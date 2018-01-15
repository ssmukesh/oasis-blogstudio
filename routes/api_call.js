var request = require('request');
var express = require('express');
var router = express.Router();
var stubData = require('../tools/stubData.js');

const blogcontentRepo = require('../lib/blogcontentRepository');
const util = require('util');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BlogContent = require('../models/blogcontent');

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

router.post('/publishBlog', function (req, res) {

    console.log("API: publishBlog");    

    let blogContent = new BlogContent();
    blogContent.bloghtml = req.body.bloghtml;
    blogContent.userid = req.body.userid;

    blogcontentRepo.publishBlogContent(blogContent, (err, data) => {
        if (err) {
            console.log('*** publishBlogContent error: ' + util.inspect(err));
            return res.json({ status: { type: "error", msg: util.inspect(err) }, statusCode: 200 });
        } else {
            console.log('*** publishBlogContent ok');
            return res.json({ status: { type: "success", msg: "published successfully!" }, statusCode: 200 });
        }
    });

});

module.exports = router;