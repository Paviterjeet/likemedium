import e from "express"
const router = e.Router()

router.get("/", (req, res) => {
    req.session.destroy(err => {                                                                //Step - 4
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect("/login"); // Redirect to home page after logout
    });
});

export default router