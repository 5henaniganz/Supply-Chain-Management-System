import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const optionsCors = {
    origin: '*'
  }

app.use(cors(optionsCors))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app