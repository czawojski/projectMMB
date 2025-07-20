const { Router } = require("express");

const indexRouter = Router();

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "Form" },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages, links: links });
});

const messages = [
  {
    text: "Go Pens!",
    user: "Sid",
    added: new Date()
  },
  {
    text: "Let's go Oilers!",
    user: "Connor",
    added: new Date()
  }
];

indexRouter.get("/new", (req, res) => {
  res.render("form", { links: links });
});

indexRouter.post("/new", (req, res) => {
  const name = req.body.name; // in form.ejs, access this property using <input name="name"
  const message = req.body.message; // name="message"
  messages.push({ text: message, user: name, added: new Date() });
  res.redirect("/");
});

indexRouter.get("/details/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  const currentMessage = messages[messageId];
  
  res.render("details", {
    title: `Message ${messageId}`,
    message: { ...currentMessage },
    messages: messages,
    links: links,
  });
});

module.exports = indexRouter;