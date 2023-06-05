import mongoose from "mongoose";
import "../storeDetails.js";

const Store = mongoose.model("StoreInfo");

const storeRouter = async (req, res) => {
  const { name, description, image, categorie, isAdmin } = req.body;

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
};

export { storeRouter };
