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

}
module.exports = new BlogContentRepository();