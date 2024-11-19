
const mongoose = require('mongoose');
const uri = "mongodb+srv://general:general@dbpatricio.scln3.mongodb.net/patrulla?retryWrites=true&w=majority&appName=DBPATRICIO";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    const db= await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Conexion exitosa con la bd: ",db.connection.name);
  } finally {
    // Ensures that the client will close when you finish/error
   // await mongoose.disconnect();
  }
}
run().catch(console.dir);
