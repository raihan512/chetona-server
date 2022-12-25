const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const allbooks = require("./data/books.json");
const allAuthors = require("./data/authors.json");
const categories = require("./data/categories.json");
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Send All Books Data
app.get('/books', (req, res) => {
    res.send(allbooks)
})
// Send Book Data By Id
app.get("/book/:id", (req, res) => {
    const id = req.params.id;
    const selectedBook = allbooks.find((selectedBook) => selectedBook._id === id);
    res.send(selectedBook);
});
// Send Book Data By cateory name
app.get("/categories", (req, res) => {
    res.send(categories);
});
app.get("/category/:id", (req, res) => {
    const id = req.params.id;
    const selectedCategory = categories.find(category => category._id === id);
    res.send(selectedCategory);
})
// Send All Authors Data
app.get('/authors', (req, res) => {
    res.send(allAuthors)
})
// Send Author Details By Id
app.get("/author/:id", (req, res) => {
    const id = req.params.id;
    const selectedAuthor = allAuthors.find((author) => author._id === id);
    res.send(selectedAuthor);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})