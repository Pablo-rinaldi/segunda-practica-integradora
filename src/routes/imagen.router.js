const express = require("express");
const imgModel = require("../models/image.js");
const router = express.Router();
const fs = require("fs").promises;
//const path = require("path");

//Routes
//root
router.get("/", async (req, res) => {
  const images = await imgModel.find();
  const imgArray = images.map((image) => {
    return {
      id: image._id,
      title: image.title,
      description: image.description,
      filename: image.filename,
      path: image.path,
    };
  });
  res.render("index", { images: imgArray, user: req.session.user });
});

//Form Routes
router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const image = new imgModel();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/" + req.file.filename;

  await image.save();

  res.redirect("/");
});
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/image/:id/delete", requireAuth, async (req, res) => {
  const { id } = req.params;
  const imagen = await imgModel.findByIdAndDelete(id);
  await fs.unlink("./src/public" + imagen.path);
  res.redirect("/");
});
module.exports = router;
