const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BlogContent = require('../models/blogcontent');

class BlogContentRepository {

    publishBlogContent(body, callback) {
        console.log('*** BlogContentRepository.publishBlogContent');

        let blogContent = new BlogContent();
        blogContent.userid = body.userid;
        blogContent.bloghtml = body.bloghtml;
        blogContent.createdAt = new Date();

        blogContent.save((err, blogContent) => {
            if (err) {
                console.log(`*** BlogContentRepository insertBlogContent error: ${err}`);
                return callback(err, null);
            }
            callback(null, blogContent);
        });
    }

    getAllPublishedBlog(callback) {
        console.log('*** BlogContentRepository.getAllPublishedBlog');
        BlogContent.count((err, blogCount) => {
            let count = blogCount;
            console.log(`Blogs count: ${count}`);

            BlogContent.find({}, (err, blogs) => {
                if (err) {
                    console.log(`*** BlogContentRepository.getAllPublishedBlog error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    blogs: blogs
                });
            });

        });
    }

}
module.exports = new BlogContentRepository();