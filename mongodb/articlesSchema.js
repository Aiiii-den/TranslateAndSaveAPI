/**
 * Title
 * Link
 * Topic
 * Language
 * Summary
 */

const mongoose = require('mongoose');

const articlesSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: false,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    }
})

const ArticlesSchema = mongoose.model('Articles', articlesSchema);

module.exports = { Articles: ArticlesSchema }