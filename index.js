const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle ware 
app.use(cors());
app.use(express.json());

// const service = require('./service/service.json');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mxcrgiz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const serviceCollection = client.db('onlineMentor').collection('service');
        const userCollection = client.db('onlineMentor').collection('users');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const service = await cursor.limit(3).toArray();
            res.send(service);
        });

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });



      





        console.log("Connected to MongoDB");
    } finally {

    }
}

run().catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Online Mentor server is running')
});

// app.get('/service', (req, res) => {
//     res.send(service);
// })

app.listen(port, () => {
    console.log(`Online Mentor server running on port: ${port}`)
});


