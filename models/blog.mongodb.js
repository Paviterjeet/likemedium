import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    blogTitle: {
        type: String,
        required: true,
        trim: true
    },
    blogSlug: {
        type: String,
        required: true,
        trim: true
    },
    blogImage: {
        type: String, // Store image URL or file path
        required: true
    },
    blogCategory: {
        type: String,
        required: true
    },
    blogDate: {
        type: String,
        required: true
    },
    blogKeywords: {
        type: String, // Array of keywords
        default:""
    },
    blogDescription: {
        type: String,
        trim: true
    },
    blogContent: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogs = mongoose.model("blogs" , blogSchema)

export default blogs