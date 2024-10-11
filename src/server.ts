import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    //mongoDB Connect
    await mongoose.connect(config.database_url as string);
    //server listening
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
