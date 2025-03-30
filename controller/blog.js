import blog from "../models/blog.mongodb.js";
import { nanoid } from "nanoid";
import slugify from "slugify"; // Ensure slugify is imported
import user from "../models/userprofile.mongodb.js"

export const handleBlogCreation = async (req, res) => {
    try {
        const { blogTitle, blogCategory, blogDate, blogKeywords, blogDescription, blogContent } = req.body;
        if (!blogTitle) {
            return res.status(400).json({ error: "Blog title is required" });
        }
        const emailId = req.session.email;
        const email = emailId.email;

        const userP = await user.findOne({email})
        const writerName = userP.fullname
        const profileImage = userP.profile
        const blogImage = req.files.blogImage[0].path.replace(/\\/g, "/")
        const blogSlug = slugify(blogTitle, { lower: true, strict: true, trim: true }) + "-" + nanoid(6);
        
       
        const response = await blog.create({ writerName,profileImage,email,blogTitle,blogSlug, blogCategory, blogDate, blogKeywords, blogDescription, blogImage, blogContent })
        if(!response){
            res.status(400).json({ errorMsg : "Blog Not Created" });
        }
       res.redirect('/blogs/myBlogs')
    } catch (error) {
        console.error("Error in handleBlogCreation:", error); // Logs the actual error
        res.status(500).json({ error: error.message });
    }
};
