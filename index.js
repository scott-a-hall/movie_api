const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

//Integrate mongoose
const mongoose = require("mongoose");
const Models = require('./models.js');
  Movies = Models.Movie;
  Users = Models.User

//Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};



app.use(myLogger);

//Gets the list of data about all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/", (req, res) => {
  res.send("My top 10 movies");
});

//Get the data about a single movie, by name
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

//Get the data about a genre by name/title
app.get("/movies/genres/:name", (req, res) => {
  res.json(
    genres.find(genre => {
      return genre.name === req.params.name;
    })
  );
});

//Get the data about a director
app.get("/movies/directors/:name", (req, res) => {
  res.json(
    directors.find(director => {
      return director.name === req.params.name;
    })
  );
});

//Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get the data about a user by username
app.get("/users/:username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Add new user
/* We'll expect JSON in this information
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists.');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.send(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Update a user's info, by Username
/* We'll expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Add a movie to a user's list of favories
app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the update document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete movies from favorites list
app.delete("/users/favorites/:title", (req, res) => {
  let movie = favMovies.find(movie => {
    return movie.title === req.params.title;
  });

  if (movie) {
    favMovies = favMovies.filter(movie => {
      return movie.title !== req.params.title;
    });
    res.status(201).send(req.params.title + " was successfully removed.");
  }
});

//Delete a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.Username + ' was not found.');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use("/documentation", express.static("public/documentation.html"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.listen(8080, () => {
  console.log("My app is listening on port 8080.");
});
