const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let movies = [
  {
    title: "Dumb & Dumber",
    description:
      "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
    genre: "Comedy",
    director: "Peter Farrelly",
    image_URL: "",
    featured: "Yes"
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action",
    director: "Christopher Nolan",
    image_URL: "",
    featured: "Yes"
  },
  {
    title: "We Were Soldiers",
    description:
      "The story of the first major battle of the American phase of the Vietnam War, and the soldiers on both sides that fought it, while their wives wait nervously and anxiously at home for the good news or the bad news.",
    genre: "Action",
    director: "Randall Wallace",
    image_URL: "",
    featured: "Yes"
  },
  {
    title: "The Lion King",
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    genre: "Adventure",
    director: "Roger Allers",
    image_URL: "",
    featured: "Yes"
  },
  {
    title: "The Notebook",
    description:
      "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    genre: "Romance",
    director: "Nick Cassavetes",
    image_URL: "",
    featured: "Yes"
  }
];

let genres = [
  {
    name: "Comedy",
    description:
      "A comedy film is one in which the main purpose of the film is to make the audience laugh."
  }
];

let directors = [
  {
    name: "Peter Farrelly",
    bio:
      "Born in Phoenixville, Pennsylvania, Peter Farrelly is an American film director, screenwriter, producer and novelist.",
    born: "December 17, 1956",
    died: "Still living"
  },
];

let users = [
  {
    name: "John Doe",
    username: "",
    password: "jdoe1",
    email: "jdoe@email.com",
    date_of_birth: "January 1, 2000"
  }
];

let favMovies = [
  {
    title: "Field of Dreams"
  }
];

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
app.get("/movies/users/:name", (req, res) => {
  res.json(
    users.find(user => {
      return user.name === req.params.name;
    })
  );
});

//Add new user
app.post("/movies/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.username = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Update user information
app.put("/movies/users/:name", (req, res) => {
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

app.post("/movies/users/favorites", (req, res) => {
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
app.delete("/movies/users/favorites/:title", (req, res) => {
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
app.delete("/movies/users/:name", (req, res) => {
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
