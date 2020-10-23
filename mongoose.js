const mongoose = require('mongoose');

const local = 'mongodb://127.0.0.1:27017/client-intake'
const heroku = process.env.MONGODB_URI; 
mongoose.connect(heroku, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
