import mongoose from "mongoose";

import Dishes from "../../models/dishes";

const dbname = "confusion";
const url = `mongodb://127.0.0.1:27017/${dbname}`;

async function main() {
  const db = await mongoose.connect(url);
  console.log("Connected successfully to server");

  try {
    const newDish = new Dishes({
      name: "New Dish 1",
      description: "New descr",
    });

    const dish = await newDish.save();
    console.log("saved", { dish });

    const dishes = await Dishes.find({}).exec();
    console.log("found", { dishes });
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();

  setTimeout(function () {
    mongoose.disconnect();
  }, 1000);

  return "done.";
}

main();
