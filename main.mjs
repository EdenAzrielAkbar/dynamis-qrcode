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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayouts);
app.set("layout", "layout/main");

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", (req, res) => {
  res.redirect("/login");
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
}
export default app;
