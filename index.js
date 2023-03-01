const express = require('express');
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

app.get('/users', (req, res) => {
    if (req.query.name) {
        // filter users by query
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered)
    }
    else {
        res.send(users)
    }

});

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    console.log(user);
    res.send(user)
})




app.listen(port, () => {
    console.log('running on port', port);
})