const getLogin = (req, res) => {
  res.render("login");
};

const getDashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user,
    layout: "layout/main",
  });
};

const notFound = (req, res) => {
  res.render("error", {
    layout: "layout/main",
  });
};

export { getDashboard, getLogin, notFound };
