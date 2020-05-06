const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);



app.listen(process.env.PORT || 3000, () => {
    console.log("App is running");
});