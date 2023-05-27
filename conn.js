// db.js
const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

// Connect to the MongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log('Connected to the database');

  // Specify the database to use
  const db = client.db(dbName);

  // Perform database operations here

  // Example: Create a collection and insert a document
  const collection = db.collection('mycollection');
  collection.insertOne({ name: 'John Doe', age: 30 }, (err, result) => {
    if (err) {
      console.error('Failed to insert document:', err);
      return;
    }
    console.log('Document inserted:', result.ops);
  });
});

module.exports = MongoClient;
