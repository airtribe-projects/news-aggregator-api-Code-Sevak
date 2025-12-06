require('dotenv').config();
 express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', require('./router/user'));
app.use('/news', require('./router/news'));

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});




module.exports = app;