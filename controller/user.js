
import user from "../models/userprofile.mongodb.js";

export const handleUserProfile = async (req, res) => {
    try {
        const { email, fullname, mobile, pronouns, bio, facebook, instagram, twitter, linkedin } = req.body;

        // Find the existing user, or return an empty object if not found
        let existingUser = await user.findOne({ email }) || {};
        const profile = req.files?.profile 
        ? req.files.profile[0].path.replace(/\\/g, "/") 
        : existingUser.profile || null;
    
    const cover = req.files?.cover 
        ? req.files.cover[0].path.replace(/\\/g, "/") 
        : existingUser.cover || null;
        
        const updatedUser = await user.findOneAndUpdate(
            { email },
            { fullname, mobile, pronouns, bio, facebook, instagram, twitter, linkedin, profile, cover },
            { new: true, upsert: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ errMsg: "User data not saved" });
        }

        console.log("Data Saved");
        return res.redirect('/user');
    } catch (error) {
        console.error(`Error while updating user profile: ${error}`);
        return res.status(500).json({ errMsg: "Internal Server Error" });
    }
};
