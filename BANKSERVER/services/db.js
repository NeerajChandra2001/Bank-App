//serever - mongodb integration

// 1 import mongoose

const mongoose  =require('mongoose')

//2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true  //to avoid unwanted warnings
})

// define bank model

const User =mongoose.model('user',{  // model creation -user

    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]

})

module.exports={
    User
}