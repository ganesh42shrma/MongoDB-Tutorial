const express = require('express');

require('dotenv').config();

const { connectToDB , getDb } = require('./db');
const { ObjectId } = require('mongodb');
//init app & middleware
const app = express();

app.use(express.json());
//db connection
let db

connectToDB((err)=>{
if(!err){
    app.listen(3000,()=>{
        console.log('listening on port 3000');
    })
    db = getDb()
}
})

//routes
app.get('/books',(req,res)=>{
    //pages 
    const page = req.query.p || 0
    const booksPerPage = 3
    let books = []

    db.collection('books').find() // cursor toArray forEach
    .sort({author:1})
    .skip(page*booksPerPage)
    .limit(booksPerPage) // limit
    .forEach(book=> books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error:"Could not fetch the documents"})
    })
});

app.get('/books/:id',(req,res)=>{

    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then( doc=> {
            res.status(200).json(doc)
        }).catch(err=>{
            res.status(500).json({error:"Could not fetch documents"})
        })
    } else{
        res.status(500).json({error:"Not a valid doc id"})
    }

})

app.get('/reviewedbooks',(req,res)=>{
    db.collection('reviewedbooks')
    .find()
    .toArray()
    .then((books)=>{
        res.status(200).json({data:books})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error:"Could not fetch the documents"})
    })
})

app.post('/books',(req,res)=>{
    const book = req.body;
    db.collection('books')
    .insertOne(book)
    .then(result=>{
        res.status(201).json(result);
    }).catch((err)=>{
        res.status(500).json({err:'Could not create new document'})
    })
})

app.delete('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        bookId = new ObjectId(req.params.id);
        db.collection('books')
        .deleteOne({_id:bookId})
        .then((result)=>{
            if(result.deletedCount === 1){
                res.status(200).json({ message: "Book successfully deleted",result});
            }else{
                res.status(404).json({ error: "Book not found" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Could not delete the book" });
        });
    }
    else{
        res.status(400).json({ error: "Not a valid doc id" });
    }
})

app.patch('/books/:id',(req,res)=>{
    const updates = req.body;
    if(ObjectId.isValid(req.params.id)){
        bookId = new ObjectId(req.params.id);
        db.collection('books')
        .updateOne({_id:bookId},{$set:updates})
        .then((result)=>{
                res.status(200).json({ message: "Book successfully Updated",result});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Could not update the book" });
        });
    }
    else{
        res.status(400).json({ error: "Not a valid doc id" });
    }
})