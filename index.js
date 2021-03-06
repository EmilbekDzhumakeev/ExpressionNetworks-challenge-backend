const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors')
const app = express();

const users = require('./routes/users')
const puzzles = require('./routes/puzzles')

connectDB();

app.use(express.json()); 
app.use(cors())
 
app.use('/api/users', users);
app.use('/api/puzzles', puzzles);

const port = process.env.PORT || 8000;
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});