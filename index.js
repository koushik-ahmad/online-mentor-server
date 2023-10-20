const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewCollection = client.db('onlineMentor').collection('review');
        const addServiceCollection = client.db('onlineMentor').collection('addService');

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

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        // app.get('/review', async (req, res) => {
        //     const query = {};
        //     const cursor = reviewCollection.find(query);
        //     const review = await cursor.toArray();
        //     res.send(review);
        // });

        // review specific user query parameter
        app.get('/review', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        // review specific Service query parameter
        app.get('/reviewId', async (req, res) => {
            let query = {};

            if (req.query.serviceId) {
                query = {
                    serviceId: req.query.serviceId
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });


        app.post('/services', async (req, res) => {
            const addService = req.body;
            const result = await serviceCollection.insertOne(addService);
            res.send(result);
        });

        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.findOne(query);
            res.send(result);
        });

        app.put('/review/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const user = req.body;
            const option = { upsert: true };
            const updateReview = {
                $set: {
                    review: user.review,
                }
            }
            const result = await reviewCollection.updateOne(filter, updateReview, option);
            res.send(result);
        });

        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
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


