const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user_route');
const cors = require('cors');
const expenseRoute = require('./routes/expense_route');
const purchaseRoute = require('./routes/purchase');
const forgorpassrouter = require('./routes/forgotpassword');
require('dotenv').config();

const pwd = process.env.PWD;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://manas:${pwd}@atlascluster.0yzq9de.mongodb.net/expense_tracker?retryWrites=true&w=majority`
).then(()=> app.listen(3000))
.then(()=>console.log(`Mongodb is connected and server is working on port 3000`))
.catch((err)=>console.log(err))

app.use(userRouter);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(forgorpassrouter);

app.get('/', (req, res)=>{
    res.send("Server is working");
})