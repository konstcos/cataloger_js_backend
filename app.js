require('module-alias/register');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;


app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const filesRouters = require('@src/domains/files/http/reutes');

app.get('/', (req, res) => {
    res.send('I am alive and ready to serve');
});


app.use('/files', filesRouters);

app.listen(port, () => {
    console.log(`Server is running`);
});
