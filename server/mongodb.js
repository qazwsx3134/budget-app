//CRUD


const {MongoClient, objectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'wayfarer'

const id = new objectID()

MongoClient.connect(connectionURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
    (error, client)=>{
    if (error) {
        return console.log('Unable to connect  to DB');
    }
    console.log('Connected correctly');
    
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'andrew',
        age: 27,
    })
})

