const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
// Middleware 
var cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
// DATABASE MongoDb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://doctorPortal:JOLSibScZOFNOees@cluster0.hli29av.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hli29av.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // DB Create 
        const doctorsCollection = client.db('doctors_portal').collection('services');
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/services', async(req, res)=> {
            const query = {};
            const result =  await doctorsCollection.find(query).toArray();
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Backend Worked ok this is backend')
})

app.listen(port, () => {
    console.log('Backend Run', port)
})