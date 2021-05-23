const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const customMiddleware = require('./middlewares/customMiddleware');
const dataRouter = require('./routes/data');

// To enable reading JSON body types
app.use(express.json());
// To enable parsin urlEncoded parameters
app.use(express.urlencoded({ extended: true }));
// To enable serving static files
// app.use(express.static('public')); // /public folder would contain static file to serve
// Good practice to enable commonly used request headers
app.use(helmet());

// To enable console loggin only in development
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(customMiddleware);
app.use('/api/data', dataRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on port: ${port}...`));