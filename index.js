const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require("mongodb");
// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("JRJBD is running");
});


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvvwsgj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productCollection = client.db("JRJBD").collection("products");


  app.post('/addProduct', async (req, res) => {
    const product = req.body;
    console.log('Received product data:', product);

    try {
      await productCollection.insertOne(product);

      console.log('Product saved to MongoDB Atlas');
      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error saving product to MongoDB Atlas:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/addProduct", async(req, res) => {
    
   const result = await productCollection.find().toArray()
    res.send(result)
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`JRJBD is running on port ${port}`);
});
