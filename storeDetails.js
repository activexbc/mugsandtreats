import mongoose from "mongoose";

const StoreDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required,
    },
  },
  {
    collection: "StoreInfo",
  }
);

mongoose.model("StoreInfo", StoreDetailsSchema);
