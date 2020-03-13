const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding the user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  Users.insert(req.params.id, req.body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(error => {
      res.status(500).json({ message: " Couldn't add user post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't get user sorry" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "No user with this ID" });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "No Such Post From This User" });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "All is gone" });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Something went wrong while deleting this user" });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't update due to an error" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = Number(req.params.id);
  if (typeof userId === "number") {
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  // do your magic!
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "missing user data" });
  } else if (!data.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const postData = req.body;
  if (!postData) {
    res.status(400).json({ message: "missing post data" });
  } else if (!postData.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
