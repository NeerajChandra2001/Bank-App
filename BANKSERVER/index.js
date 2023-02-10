// server creation

//1 import express
const express = require('express')

//import  jsonwebtoken

const jwt = require('jsonwebtoken')

//import cors

const cors = require('cors');




const dataService = require('./services/dataServices')

//2 create an app using express

const app = express();
app.use(express.json())


//give command to share data via cors

app.use(cors({
    origin: ['http://localhost:4200','http://192.168.0.160:8080',' http://192.168.0.160:8080']
}))


//3 create a port number

app.listen(3000, () => {
    console.log('listening on port 3000');
})


//application specific middleware

const appMiddleware = (req, res, next) => {
    console.log("application specific middleware");
    next();
}
app.use(appMiddleware);



//Router specific middleware

const jwtRoutermiddleware = (req, res, next) => {
    try {
        console.log("Router specific middleware");
        const token = req.headers['access-token'];
        const data = jwt.verify(token, 'superkey2023');
        console.log(data);
        next();
    } catch {

        //422 unprocessable entity
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "please login first"

        })
    }
}




//4 Resolving http request

// app.get('/',(req,res)=>{
//     res.send('get http request')
// })

// app.post('/',(req,res)=>{
//     res.send('post http request')
// })

// app.patch('/',(req,res)=>{
//     res.send('patch http request')
// })

// app.delete('/',(req,res)=>{
//     res.send('delete http request')
// })


//API calls






//register request
app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.username, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})

//login request


app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result)
        }
    )

})

//deposite request


app.post('/deposit', jwtRoutermiddleware, (req, res) => {
    dataService.deposit(req.body.acno, req.body.password, req.body.amount).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})


// withdraw request

app.post('/withdraw', jwtRoutermiddleware, (req, res) => {
    dataService.withdraw(req.body.acno, req.body.password, req.body.amount).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})

//get transaction


app.post('/transaction', jwtRoutermiddleware, (req, res) => {
    dataService.getTransaction(req.body.acno).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )

})

//delete request
app.delete('/deleteAcc/:acno', (req, res) => {
    dataService.deleteAcc(req. params.acno).then(
        result => {
            res.status(result.statusCode).json(result)

        }
    )
})

