const express = require('express');
require('./mongoose');
const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
    firstName: {
        type: String,
        default: 'firstName'
    },
    lastName: {
        type: String,
        default: 'lastName'
    },
    email: {
        type: String,
        default: 'email@email.com'
    },
    phone: {
        type: String,
        default: '55555555'
    },
    isCurrentClient: {
        type: Boolean,
        default: false
    }
});

const app = express();
const port = process.env.PORT || 3000;


app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.get('/clients/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const client = await Client.findById(_id);
        if (!client) {
            return res.status(400).send();
        }
        res.send(client);
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/clients', async (req, res) => {
    const client = new Client(req.body);
    try {
        await client.save();
        res.status(201).send(client);
    } catch (e) {
        res.send(400).send(e);
    }
});

app.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.send(client)
    } catch (e) {
        res.status(500).send();
    }
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello, friend');
})

app.listen(port, () => {
    console.log('client-intake is up on port ' + port);
});

