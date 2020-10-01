const express = require('express');

const router = express.Router();

const users = require("../users/userDb")
const posts = require("../posts/postDb.js")

router.post('/',validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body
  users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status({error: "There was an error while saving the new user to the database"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const newPost = req.body;
  newPost.user_id = id
  posts.insert(newPost)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "error occured while adding new post"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get(req)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Something went wrong while getting users data"})
    })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "The post information could not be modified." })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "The get post could not be modified."})
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(user => {
      res.status(200).json({message: `User deleted ${user}`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "The get post could not be modified."})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const updateUser = req.body;
  const id = req.params.id;

  users.update(id, updateUser)
    .then(user => {
      res.status(201).json(updateUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "error occured while updating the user"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = Number(req.params.id)
  users.get()
    .then(users => {
      if(users.find(user => user.id === id)){
        next()
      }else {
        res.status(404).json({ message: "invalid user id"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error occured from userId"})
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name){
    res.status(400).json({message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field" })
  } else {
    next()
  }
}

module.exports = router;
