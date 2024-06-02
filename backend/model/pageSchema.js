const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
