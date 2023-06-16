const express= require('express')
const app = express();
const dotenv= require('dotenv');
const connectdb = require('./db');
var cors= require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// create application/json parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
//app.use('/login', require('./Router/auth'))

connectdb();

dotenv.config({path:'config.env'})
const port= process.env.PORT||4000;
app.use('/',require('./Router/Router'))


app.get('/', (req, res)=>{
 res.send('This is the login page')
})


app.listen(port,()=>{
    console.log(` server is running at http://localhost:${port}/`);
})