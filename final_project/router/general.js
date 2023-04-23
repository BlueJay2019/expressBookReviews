const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      console.log(users);
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  //Task 1
  //res.send(JSON.stringify(books, null, 4));
  //Task 10
  const getBooksPromise = new Promise((resolve, reject) => {
    resolve(books);
  });

  getBooksPromise
  .then((data) => {
    res.send(JSON.stringify(data, null, 4));
  })
  .catch((error) => {
    res.status(500).json({ message: error.message });
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 
  //Task2
  /*
   const isbn = req.params.isbn;
   if(isbn)
   {
       res.send(books[isbn]);
   }
   else{
        return res.status(400).json({message: "Cannot find the isbn"});
   }*/
   //Task11
   const getBooksPromise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    if(isbn && books[isbn])
    {
        resolve(books[isbn]);
    }
    else{
        reject("Cannot find the isbn");
    }
  });

  getBooksPromise
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.status(500).json({ message: error.message });
  });


 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //Task3   
  /*
  const author = req.params.author;
  let result = {};
  if(author)
  {
      const keys = Object.keys(books);
      for(var i = 0; i < keys.length; i++)
      {
        if(books[keys[i]].author == author)
            {
                result[keys[i]] = books[keys[i]];
            }          
      }
      

      res.send(result);
  }
  else{
       return res.status(400).json({message: "Cannot find the author"});
  }
  */
   //Task12
    const getBooksPromise = new Promise((resolve, reject) => {
        const author = req.params.author;
        let result = {};
        if(author)
        {
            const keys = Object.keys(books);
            for(var i = 0; i < keys.length; i++)
            {
              if(books[keys[i]].author == author)
                  {
                      result[keys[i]] = books[keys[i]];
                  }          
            }
            
      
            resolve(result);
        }
        else{
             reject("Cannot find the author");
        }
    });

  getBooksPromise
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.status(500).json({ message: error.message });
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //Task4
  /*
  const title = req.params.title;
  let result = {};
  if(title)
  {
      const keys = Object.keys(books);
      for(var i = 0; i < keys.length; i++)
      {
        if(books[keys[i]].title == title)
            {
                result[keys[i]] = books[keys[i]];
            }          
      }
      

      res.send(result);
  }
  else{
       return res.status(400).json({message: "Cannot find the title"});
  }
  */
    //Task13
    const getBooksPromise = new Promise((resolve, reject) => {
    const title = req.params.title;
    let result = {};
    if(title)
    {
        const keys = Object.keys(books);
        for(var i = 0; i < keys.length; i++)
        {
          if(books[keys[i]].title == title)
              {
                  result[keys[i]] = books[keys[i]];
              }          
        }
        
  
        resolve(result);
    }
    else{
        reject("Cannot find the title");
    }
    });

    getBooksPromise
        .then((data) => {
        res.send(data);
        })
        .catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  if(isbn)
  {
      res.send(books[isbn].reviews);
  }
  else{
       return res.status(400).json({message: "Cannot find the isbn"});
  }
});

module.exports.general = public_users;
