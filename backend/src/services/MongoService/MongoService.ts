import { MongoClient } from "mongodb";
import assert from "assert";

import {
  insertDocument,
  findDocuments,
  updateDocument,
} from "../dbOperationsService/dbOperationsService";

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

const dbname = "confusion";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbname);

  try {
    const { insertedId } = await insertDocument(
      db,
      { name: "Newbie", description: "Just a newbie" },
      "dishes"
    );

    await findDocuments(db, "dishes");

    await updateDocument(
      db,
      { name: "Newbie", _id: insertedId },
      { description: "UPDATED newbie" },
      "dishes"
    );

    const docs = await findDocuments(db, "dishes");
    console.log("Found docs after updating");
    console.log({ docs });

    await db.dropCollection("dishes");
    client.close();
  } catch (err) {
    console.log(err);
  }

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
