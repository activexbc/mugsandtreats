import mongoose from "mongoose";
import "../storeDetails.js";

const Store = mongoose.model("StoreDetails");

const storeRouter = async (req, res) => {
  const { name, description, image, categorie } = req.body;

  if (Store.findOne({ isAdmin }) == "true") {
    try {
      await Store.create({
        name: name,
        description: description,
        image: image,
        categorie: categorie,
      });
      res.status(200).json({ message: "Registered Correctly" });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.send({ status: "error", message: "Not Logged In" });
  }
};

export { storeRouter };