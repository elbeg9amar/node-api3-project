const express = require('express');

const router = express.Router();

const posts = require("../posts/postDb")

router.get('/', (req, res) => {
  // do your magic!
  posts.get(req)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Something went wrong!"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Something Wrong"})
    })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
    .then(post => {
        res.status(200).json({message:`post deleted ${post}`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "The post could not be removed" })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  if(!req.body.text){
    return res.status(400).json({errorMessage: "Please provide text for the post."})
  };
  const updatePost = req.body;
  const id = req.params.id;
  // do your magic!
  posts.update(id, updatePost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "The post information could not be modified." })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = Number(req.params.id)
  posts.get(id)
    .then(posts => {
      if(posts.find(post => post.id === id)){
        next()
      }
      else{
        res.status(404).json({ message: "invalid post id"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error occured postId"})
    })
}

module.exports = router;
