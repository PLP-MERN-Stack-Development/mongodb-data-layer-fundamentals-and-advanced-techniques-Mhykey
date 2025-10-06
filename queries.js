const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "plp_bookstore";
const collectionName = "books";

async function runQueries() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Find
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log("\nBooks in Fiction genre:", fictionBooks);

    const recentBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("\nBooks published after 1950:", recentBooks);

    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log("\nBooks by George Orwell:", orwellBooks);

    const updateResult = await collection.updateOne(
      { title: "The Hobbit" },
      { $set: { price: 20.99 } }
    );
    console.log("\nUpdated The Hobbit’s price:", updateResult.modifiedCount);

    const deleteResult = await collection.deleteOne({ title: "Moby Dick" });
    console.log("\nDeleted Moby Dick:", deleteResult.deletedCount);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

runQueries();
