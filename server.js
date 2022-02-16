const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/jazz_greats_db"
);

//models
const Instrument = sequelize.define("instrument", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

const Artist = sequelize.define("artist", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

Artist.belongsTo(Instrument);
Instrument.hasMany(Artist);

//express app
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/instruments");
});

app.get("/instruments", async (req, res, next) => {
  try {
    const instruments = await Instrument.findAll();
    //res.send(instruments);
    res.send(`<html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
      <body>
        <h1>Jazz Greats</h1>
        <h2>Find out who played what!</h2>
        <ul>${instruments
          .map(
            (instrument) =>
              `<li><a href="/artists/${instrument.id}">${instrument.name}</li></a>`
          )
          .join("")}</ul>
      </body>
    </html>`);
  } catch (ex) {
    next(ex);
  }
});

app.get("/artists/:id", async (req, res, next) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    const instrumentId = req.params.id;
    const artists = await Artist.findAll({
      where: { instrumentId: instrumentId },
    });
    const word = instrument.id === 8 ? "were" : "played";
    res.send(
      `<html>
      <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
      <body>
        <h1>Jazz Greats who ${word} ${instrument.name}</h1>
        ${artists.map((artist) => `<div>${artist.name}</div>`).join("")}
        <form method='POST'>
        <input name='name' placeholder='insert artist'/>
        <button>Submit</button>
        </form>
        <a href="/" id="home">Home Page</a>
      </body>
    </html>`
    );
  } catch (ex) {
    next(ex);
  }
});

app.post("/artists/:id", async (req, res, next) => {
  try {
    const name = req.body.name;
    const instrumentId = req.params.id;
    await Artist.create({ name, instrumentId });
    res.redirect(`/artists/${instrumentId}`);
  } catch (ex) {
    next(ex);
  }
});

const port = 7422 || process.env.PORT;
app.listen(port, () => {
  console.log(`tunin in on ${port}`);
});

module.exports = { Artist, Instrument, sequelize };
