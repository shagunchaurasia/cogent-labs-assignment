import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT ?? 5001;

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))

export default app;