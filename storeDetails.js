import mongoose from "mongoose";

const StoreDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desciption: {
      type: String,
    },
    image: {
      type: String,
    },
    categorie: {
      type: String,
    },
  },
  {
    collection: "StoreInfo",
  }
);

mongoose.model("StoreInfo", StoreDetailsSchema);
