import { router as authRouter } from "./routes/auth.mjs";
import { router as indexRouter } from "./routes/index.mjs";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import passport from "passport";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cats",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
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

// 5. Routing Aplikasi
app.use("/", authRouter);
app.use("/", indexRouter);

app.use((req, res) => {
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`listening on: http://localhost:${port}`);
});
