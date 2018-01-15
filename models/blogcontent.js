const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const BlogContentSchema = new Schema({
    userid: { type: String, required: true, trim: true },
    bloghtml: { type: String, required: false, trim: false },
    createdAt: { type: Date, required: true, trim: true }
});

module.exports = mongoose.model('BlogContent', BlogContentSchema);