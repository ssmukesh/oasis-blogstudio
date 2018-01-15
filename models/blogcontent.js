const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const BlogContentSchema = new Schema({
    id: { type: Number, required: true },    
    name: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('BlogContent', BlogContentSchema);