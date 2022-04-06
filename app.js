const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    res.render("home");
});

app.listen(4200, () => {
    console.log("SERVER RUNNING IN PORT 4200...")
});
