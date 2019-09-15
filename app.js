import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index'

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, ()=> {
    console.log(`The student registration server is running at ${port}`);
});

export default app;