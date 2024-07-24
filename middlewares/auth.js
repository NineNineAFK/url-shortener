const { getUser } = require("../service/auth");

function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("User UID from cookies:", userUid); // Log user UID

    if (!userUid) {
        console.log("No UID found in cookies. Redirecting to login.");
        return res.redirect("/user/login");
    }

    const user = getUser(userUid);
    console.log("User from session store:", user); // Log user details

    if (!user) {
        console.log("User not found in session store. Redirecting to login.");
        return res.redirect("/user/login");
    }

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
};
