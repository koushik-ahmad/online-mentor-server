const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middle ware 
app.use(cors());
app.use(express.json());


// user: onlineMentorDBUser
// pass: YMSHam4CUoLpQqfY

const uri = "mongodb+srv://onlineMentorDBUser:YMSHam4CUoLpQqfY@cluster0.mxcrgiz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollection = client.db('onlineMentor').collection('users');



        console.log("Connected to MongoDB");
    } finally {

    }
}

run().catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Online Mentor server is running')
});

app.listen(port, () => {
    console.log(`Online Mentor server running on port: ${port}`)
});
