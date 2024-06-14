# MongoDB Tutorial

## What is MongoDB?
**Q: What is MongoDB?**

A: MongoDB is a NoSQL database known for its flexibility and scalability. Unlike traditional SQL databases, MongoDB stores data in JSON-like documents, making it easier to manage and query data dynamically.

## Using MongoDB in the Shell
**Q: How do you use MongoDB in the shell?**

A: To interact with MongoDB via the shell, follow these steps:
1. **Start MongoDB Server:**
   ```sh
   mongod
   ```
2. **Open MongoDB Shell:**
   ```sh
   mongosh
   ```

## Basic Commands
**Q: What are some basic MongoDB commands?**

A:
- **Show Databases:**
  ```sh
  show dbs
  ```
- **Use a Database:**
  ```sh
  use <database_name>
  ```
- **Show Collections:**
  ```sh
  show collections
  ```
- **Insert a Document:**
  ```sh
  db.collection_name.insertOne({ key: "value" })
  ```
- **Find Documents:**
  ```sh
  db.collection_name.find()
  ```
- **Update a Document:**
  ```sh
  db.collection_name.updateOne({ key: "value" }, { $set: { key: "new_value" } })
  ```
- **Delete a Document:**
  ```sh
  db.collection_name.deleteOne({ key: "value" })
  ```

## Connecting to Local MongoDB
**Q: How do you connect to a local MongoDB instance?**

A: Ensure your MongoDB server is running locally. Use the following connection string to connect:
```plaintext
mongodb://localhost:27017/mydatabase
```

## Connecting to MongoDB Atlas
**Q: How do you connect to MongoDB Atlas?**

A:
1. **Set up an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).**
2. **Create a cluster and get the connection string.**
3. **Replace `<password>` and `<dbname>` with your actual password and database name.**

```plaintext
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

## Node.js Application Example

### Prerequisites
**Q: What are the prerequisites for creating a Node.js application with MongoDB?**

A:
- Node.js installed
- MongoDB running locally or MongoDB Atlas set up
- `dotenv` package to manage environment variables

### Setup
**Q: How do you set up a Node.js project to use MongoDB?**

A:
1. **Initialize the project:**
   ```sh
   npm init -y
   ```
2. **Install dependencies:**
   ```sh
   npm install express mongodb dotenv
   ```
3. **Create a `.env` file:**
   ```sh
   touch .env
   ```
   Add your MongoDB connection string to the `.env` file:
   ```plaintext
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
4. **Create the project files:**
   - `app.js`
   - `db.js`

### Code Explanation
**Q: What is the purpose of `db.js` and `app.js`?**

A: 
- `db.js`: Establishes a connection to MongoDB using the connection string from the `.env` file. Provides functions to connect to the database and retrieve the database connection.
- `app.js`: Sets up an Express.js server, connects to the MongoDB database using the functions from `db.js`, and provides various endpoints to interact with the `books` collection.

### Running the Application
**Q: How do you run the Node.js application?**

A:
1. **Start the server:**
   ```sh
   node app.js
   ```
2. **Access the endpoints:**
   - GET `/books`
   - GET `/books/:id`
   - GET `/reviewedbooks`
   - POST `/books`
   - DELETE `/books/:id`
   - PATCH `/books/:id`

By following this tutorial, you will have a basic understanding of MongoDB and how to interact with it using a Node.js application.
