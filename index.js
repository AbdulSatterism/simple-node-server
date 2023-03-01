const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('simple node server running')
});

const users = [
    { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'sabmit', email: 'sabmit@gmail.com' },
    { id: 3, name: 'sabnur', email: 'sabnur@gmail.com' },
    { id: 4, name: 'sanjana', email: 'sanjana@gmail.com' }
];

// dbUser1
// yB0ZTOnVCh6NduuA



const uri = "mongodb+srv://dbUser1:yB0ZTOnVCh6NduuA@cluster0.xqjxc3x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'Nahiya Nahi', email: 'nahiya@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result)

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result)
            user._id = result.insertedId;
            res.send(user)
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         // filter users by query
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered)
//     }
//     else {
//         res.send(users)
//     }

// });

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log('running on port', port);
})