// Import required libs
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { body, validationResult } from "express-validator";
import methodOverride from "method-override";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import "./utils/dbcon.js";
import { Contact } from "./model/contact.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("index", {
    nama: "Syauqi",
    title: "Beranda",
    layout: "partials/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "partials/main",
  });
});

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Contact",
    layout: "partials/main",
    contacts,
  });
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact", {
    title: "Add new contact",
    layout: "partials/main",
  });
});

app.post(
  "/contact/add-contact",
  [
    body("name").custom(async (value) => {
      const duplicated = await Contact.findOne({ name: value });
      if (duplicated) {
        throw new Error("Name already saved!");
      }
      return true;
    }),
    body("email", "Email is invalid").isEmail(),
    body("phoneNumber", "Phone number is invalid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("add-contact", {
        title: "Add new contact",
        layout: "partials/main",
        errors: errors.array(),
      });
    } else {
      await Contact.insertMany(req.body);
      req.flash("msg", "Contact saved successfully!");
      res.redirect("/contact");
    }
  }
);

app.delete("/contact/delete/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("<h1>Error 404: Contact not found</h1>");
    }
    await Contact.deleteOne({ _id: contact._id });
    req.flash("msg", "Contact deleted successfully!");
    return res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/contact/edit/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("edit", {
    title: "Edit contact",
    layout: "partials/main",
    contact,
  });
});

app.put(
  "/contact/:id",
  [
    body("name").custom(async (value, { req }) => {
      const duplicated = await Contact.findOne({ name: value });
      if (value !== req.body.oldName && duplicated) {
        throw new Error("Name already saved!");
      }
      return true;
    }),
    body("email", "Email is invalid").isEmail(),
    body("phoneNumber", "Phone number is invalid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("edit", {
        title: "Edit contact",
        layout: "partials/main",
        errors: errors.array(),
        contact: req.body,
      });
    }

    try {
      await Contact.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        },
      });
      req.flash("msg", "Contact edited successfully!");
      res.redirect("/contact");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("detail", {
    title: "Details",
    layout: "partials/main",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Error 404 : Page not found");
});

app.listen(port, () => {
  console.log(
    `Contact App with MongoDB, listening at http://localhost:${port}`
  );
});