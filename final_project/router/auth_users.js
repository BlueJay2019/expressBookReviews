const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userwithsamename = users.filter((x)=>{return x.username === username;});
    if(userwithsamename.length > 0){
        return true;
    }
    else{
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((x)=>{
        return (x.username === username && x.password == password);
    });

    if(validusers.length > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password)

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60*60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  const loginname = req.session.authorization['username'];
  const isbn = req.params.isbn;

  console.log(loginname);
  if(isbn)
  {
        books[isbn].reviews[loginname] = req.body.review;
        res.send(loginname + " has updated the review for isbn " + isbn);
  }
  else{
       return res.status(400).json({message: "Cannot find the isbn"});
  }
});

// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
  
    const loginname = req.session.authorization['username'];
    const isbn = req.params.isbn;
  
    console.log(loginname);
    if(isbn)
    {
          delete books[isbn].reviews[loginname];
          res.send(loginname + " has deleted the review for isbn " + isbn);
    }
    else{
         return res.status(400).json({message: "Cannot find the isbn"});
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
