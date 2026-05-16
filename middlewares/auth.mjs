import passport from "../controllers/authController.mjs";

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const authScope = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const authCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
});

const handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).send("Gagal melakukan logout.");
    }
    req.session.destroy((err) => {
      if (err) {
        res.json({ err, message: "gagal menghapus session" });
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  });
};

export { isAuth, authCallback, authScope, handleLogout };
