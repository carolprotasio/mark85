const { MongoClient } = require('mongodb')

const mongoUri = 'mongodb+srv://qax:xperience@cluster0.acyh8.mongodb.net/mongodb?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(mongoUri)

async function connect(){
    await client.connect()
    return client.db('markdb')
} 
async function disconnect() {
    await client.disconnect()
}


module.exports= { connect, disconnect}

