const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());
// Connect database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4yec41.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Hello World!')
})
async function run() {
    const bookCollection = client.db("chetonaprokashon").collection("book");
    const categoryCollection = client.db("chetonaprokashon").collection("category");
    const authorCollection = client.db("chetonaprokashon").collection("author");

    try {
        // Load all books data
        app.get('/books', async (req, res) => {
            const query = {}
            const allbooks = await bookCollection.find(query).toArray();
            res.send(allbooks)
        })
        // Load book data by id
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const selectedBook = await bookCollection.findOne(query);
            res.send(selectedBook);
        });
        // Load all book cateory
        app.get("/categories", async (req, res) => {
            const query = {}
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories)
        });
        // Load book category by id
        app.get("/category/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const selectedCategory = await categoryCollection.findOne(query);
            res.send(selectedCategory);
        })
        // Load all authors
        app.get('/authors', async (req, res) => {
            const query = {};
            const allAuthors = await authorCollection.find(query).toArray();
            res.send(allAuthors)
        })
        // Load single author by id
        app.get("/author/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const selectedAuthor = await authorCollection.findOne(query);
            res.send(selectedAuthor);
        })
    }
    finally { }
}
run().catch()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})