const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const { Burger } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const burgerImagesDir = path.join(__dirname, "../", "public", "burger-images");

const getBurgers = async (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const skip = (page - 1) * limit;

  const burgersList = await Burger.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(burgersList);
};

const getById = async (req, res) => {
  const { burgerId } = req.params;

  const burger = await Burger.findById(burgerId); // .findOne({ _id: burgerId });

  if (!burger) throw HttpError(404);

  res.json(burger);
};

const addBurger = async (req, res) => {
  const { path: tmpUpload, originalname, filename } = req.file;
  // const filename = `${req.burger._id}_${originalname}`;
  // const filename = originalname;
  // const filename = `${req.file.filename}_${originalname}`;

  // const burgerImg = await Jimp.read(tmpUpload);
  // await burgerImg.resize(250, 250).quality(85).writeAsync(tmpUpload);

  const resultUpload = path.join(burgerImagesDir, filename);
  await fs.rename(tmpUpload, resultUpload);

  const image = path.join("burger-images", filename);

  const newBurger = {
    ...req.body,
    image,
  };

  const addedBurger = await Burger.create(newBurger);

  res.status(201).json(addedBurger);
};

const deleteBurger = async (req, res) => {
  const { burgerId } = req.params;

  const deletedBurger = await Burger.findOneAndRemove({ _id: burgerId });

  if (!deletedBurger) throw HttpError(404);

  res.status(200).json({ message: "burger deleted" });
};

const updateBurger = async (req, res) => {
  const { burgerId } = req.params;

  if (req.file) {
    // Deleting old image
    let oldImage = null;
    const burgerToUpdate = await Burger.findOne({ _id: burgerId });
    if (burgerToUpdate) {
      oldImage = burgerToUpdate.image;
    }
    await fs.unlink(
      path.join(path.join(burgerImagesDir, path.basename(oldImage)))
    );
    console.log("Old image deleted successfully.");

    // New image
    const { path: tmpUpload, filename } = req.file;
    const resultUpload = path.join(burgerImagesDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const image = path.join("burger-images", filename);
    req.body.image = image;
  }

  const updatedBurger = await Burger.findOneAndUpdate(
    { _id: burgerId },
    req.body,
    { new: true }
  );

  if (!updatedBurger) throw HttpError(404);

  res.json(updatedBurger);
};

module.exports = {
  getBurgers: ctrlWrapper(getBurgers),
  getById: ctrlWrapper(getById),
  addBurger: ctrlWrapper(addBurger),
  deleteBurger: ctrlWrapper(deleteBurger),
  updateBurger: ctrlWrapper(updateBurger),
};
