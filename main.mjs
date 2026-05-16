import { router as authRouter } from "./routes/auth.mjs";
import { router as indexRouter } from "./routes/index.mjs";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import passport from "passport";
import express from "express";
const port = process.env.PORT;

const app = express();

app.use(
  session({
    secret: "keyboard cats",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/main");

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", (req, res) => {
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`listening on: http://localhost:${port}`);
});
