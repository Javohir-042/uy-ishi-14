import express from 'express';
import router from './routes/users.route.js';
import {config} from 'dotenv';
config()

const PORT = config.PORT || 3000
const app = express();

app.use(express.json());

app.use('/postgres', router);

app.listen(PORT, () => console.log('server running on port', PORT));