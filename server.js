const express = require('express');
const articles = require('./routes/articles');

const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})
app.use('/article', articles);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`server running on  http://localhost:${PORT}`);
    }
});



