const db = require("../models");
const Animal = db.animals;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
    // Create a Animal model object
    const animal = new Animal({
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      colour: req.body.colour
    });
    
    // Save Animal in the database
    animal
      .save()
      .then(animalData => {
        console.log("Animal saved in the database: " + animalData);

        // Now update the user by creating the reference
        db.users.findByIdAndUpdate(
          req.body.userid,  //We assume userid is an attribute in the JSON
          { $push: { animals: animalData._id } },
          { new: true, useFindAndModify: false }
        ).then(userData => {
          console.log(`The updated user: ${userData}`);
          // Returning the new animal
          res.send(animalData);
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Animal."
        });
      });
   };

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Animal
      .find(condition)
      .then(data => {
        //res.render('animals',
        //  {title: 'Pet Store',
        //   animals: data});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Animals."
        });
      });
   };
 
// Find a single Animal with an id
exports.findOne = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Animals."
  });

};
 
// Update a Animal by the id in the request
exports.update = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Animals."
  });
};
 
// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Animals."
  });
};
 
// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Animals."
  });
};