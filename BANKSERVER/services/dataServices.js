//import jsonwebtoken

const jwt = require('jsonwebtoken')

//import db.js

const db = require('./db')





// userDetails = {
//   1000: { acno: 1000, username: 'Neeraj', password: 1000, balance: 2000, transaction: [] },
//   1001: { acno: 1001, username: 'Arjun', password: 1001, balance: 2000, transaction: [] },
//   1002: { acno: 1002, username: 'Sanjay', password: 1002, balance: 2000, transaction: [] }

// }



const register = (acno, username, password) => {
  return db.User.findOne({ acno }).then(//asynchronous call
    user => {
      if (user) {
        return {
          status: false,
          statusCode: 401,
          message: "user already exist"
        }
      }
      else {
        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 5000,
          transaction: []
        })
        newUser.save()  //to save new data to mongodb
        return {
          status: true,
          statusCode: 200,
          message: "register successful"
        }
      }
    }
  )
}



const login = (acno, password) => {
  return db.User.findOne({ acno, password }).then(
    user => {
      if (user) {
        currentUser = user.username
        currentAcno = acno;

        // token generation
        const token = jwt.sign({ currentAcno: acno }, 'superkey2023')
        //superkey will be generate a number eg: dfhgsfvsjdgfjskhfjfk

        return {
          status: true,
          statusCode: 200,
          message: "login successful",
          token: token,
          currentUser: user.username,
          currentAcno: acno
        }

      }
      else {
        return {
          status: false,
          statusCode: 401,
          message: "invalid userdetails"
        }
      }
    }
  )
  // if (acno in userDetails) {
  //   if (password == userDetails[acno]['password']) {
  //     currentUser = userDetails[acno]['username'];
  //     currentAcno = acno;

  //     // token generation
  //     const token = jwt.sign({ currentAcno: acno }, 'superkey2023')
  //     //superkey will be generate a number eg: dfhgsfvsjdgfjskhfjfk

  //     return {
  //       status: true,
  //       statusCode: 200,
  //       message: "login successful",
  //       token: token
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       statusCode: 401,
  //       message: "invalid password"
  //     }
  //   }

  // }
  // else {
  //   return {
  //     status: false,
  //     statusCode: 401,
  //     message: 'invalid userdetails'
  //   }

  // }
}



const deposit = (acno, password, amt) => {
  var amount = parseInt(amt);
  return db.User.findOne({ acno, password }).then(
    user => {
      if (user) {
        if (password == user.password) {

          user.balance += amount;
          user.transaction.push({
            type: 'credit',
            amount
          })
          user.save();
          return {
            status: true,
            statusCode: 200,
            message: `${amount} is credited and balnace in ${user.balance}`
          }

        }
        else {

          return {
            status: false,
            statusCode: 401,
            message: 'invalid userdetails'
          }
        }
      }
    }
  )
  // if (acno in userDetails) {
  //   if (pswd == userDetails[acno]['password']) {
  //     userDetails[acno]['balance'] += amount;
  //     userDetails[acno]['transaction'].push({
  //       type: 'credit',
  //       amount
  //     })
  //     return {
  //       status: true,
  //       statusCode: 200,
  //       message: `${amount} is credited and balnace in ${userDetails[acno]['balance']}`
  //     }

  //   }
  //   else {

  //     return {
  //       status: false,
  //       statusCode: 401,
  //       message: 'invalid password'
  //     }
  //   }

  // }
  // else {
  //   return {
  //     status: false,
  //     statusCode: 401,
  //     message: 'invalid userdetails'
  //   }
  // }
}



const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password }).then(
    user => {
      if (user) {
        if (password == user.password) {
          if (user.balance > amount) {
            user.balance -= amount;
            user.transaction.push({
              type: 'debit',
              amount
            })
            user.save()
            return {
              status: true,
              statusCode: 200,
              message: `${amount} is debited and balnace in ${user.balance}`
            }

          } else {
            return {
              message: "insufficient balance"
            }
          }



        }
        else {
          return {
            status: false,
            statusCode: 401,
            message: 'invalid password'
          }
        }
      }

    }

  )
  // if (acno in userDetails) {
  //   if (pswd == userDetails[acno]['password']) {
  //     if (userDetails[acno]['balance'] > amount) {
  //       userDetails[acno]['balance'] -= amount;
  //       userDetails[acno]['transaction'].push({
  //         type: 'debit',
  //         amount
  //       })
  //       return {
  //         status: true,
  //         statusCode: 200,
  //         message: `${amount} is credited and balnace in ${userDetails[acno]['balance']}`
  //       }

  //     }


  //   }
  //   else {
  //     return {
  //       status: false,
  //       statusCode: 401,
  //       message: 'invalid password'
  //     }
  //   }

  // }
  // else {
  //   return {
  //     status: false,
  //     statusCode: 401,
  //     message: 'invalid userdetails'
  //   }
  // }
}

const getTransaction = (acno) => {
  return db.User.findOne({ acno }).then(
    user => {
      if (user) {
        return {
          status: true,
          statusCode: 200,
          transaction: user.transaction
        }

      }
      else {
        return {
          status: false,
          statusCode: 401,
          message: "user not found"
        }

      }
    }
  )

  // return {
  //   status: true,
  //   statusCode: 200,
  //   transaction: userDetails[acno]['transaction']
  // }


}

//delete account 

const deleteAcc = (acno) => {
  return db.User.findOneAndDelete({ acno }).then(
    user => {
      if (user) {
        return {
          status: true,
          statusCode: 200,
          message: 'user deleted'
        }
      }
      else {
        return {
          status: false,
          statusCode: 401,
          message: "user not found"
        }

      }
    }
  )
}



module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}

