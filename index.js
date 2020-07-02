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

//Get the data about a user
app.get("/users/:name", (req, res) => {
  res.json(
    users.find(user => {
      return user.name === req.params.name;
    })
  );
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

//Update user information
app.put("/users/:name", (req, res) => {
  let user = users.find(user => {
    return user.name === req.params.name;
  });

  if (user) {
    user.password[req.params.password];
    user.email[req.params.email];
    user.date_of_birth[req.params.date_of_birth];
    res
      .status(201)
      .send(req.params.name + "'s information was updated successfully");
  } else {
    res
      .status(404)
      .send("User with the name " + req.params.name + " was not found");
  }
});

app.post("/users/favorites", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    favMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
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

//Delete user account
app.delete("/users/:name", (req, res) => {
  let user = users.find(user => {
    return user.name === req.params.name;
  });

  if (user) {
    users = users.filter(user => {
      return user.name !== req.params.name;
    });
    res.status(201).send(req.params.name + " was successfully removed.");
  }
});

app.use("/documentation", express.static("public/documentation.html"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.listen(8080, () => {
  console.log("My app is listening on port 8080.");
});
