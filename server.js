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
//seed, sync and listen
// const start = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     const tenor_sax = await Instrument.create({ name: "tenor sax" });
//     const alto_sax = await Instrument.create({ name: "alto sax" });
//     const trumpet = await Instrument.create({ name: "trumpet" });
//     const guitar = await Instrument.create({ name: "guitar" });
//     const bass = await Instrument.create({ name: "bass" });
//     const piano = await Instrument.create({ name: "piano" });
//     const drums = await Instrument.create({ name: "drums" });
//     const vocals = await Instrument.create({ name: "vocalists" });
//     await Artist.create({ name: "John Coltrane", instrumentId: tenor_sax.id });
//     await Artist.create({ name: "Sonny Rollins", instrumentId: tenor_sax.id });
//     await Artist.create({ name: "Joe Henderson", instrumentId: tenor_sax.id });
//     await Artist.create({ name: "Wayne Shorter", instrumentId: tenor_sax.id });
//     await Artist.create({ name: "Charlie Parker", instrumentId: alto_sax.id });
//     await Artist.create({
//       name: "Cannonball Adderly",
//       instrumentId: alto_sax.id,
//     });
//     await Artist.create({ name: "Ornette Coleman", instrumentId: alto_sax.id });
//     await Artist.create({ name: "Lee Morgan", instrumentId: trumpet.id });
//     await Artist.create({ name: "Clifford Brown", instrumentId: trumpet.id });
//     await Artist.create({ name: "Miles Davis", instrumentId: trumpet.id });
//     await Artist.create({ name: "Kenny Dorham", instrumentId: trumpet.id });
//     await Artist.create({ name: "Wes Montgomery", instrumentId: guitar.id });
//     await Artist.create({ name: "Jim Hall", instrumentId: guitar.id });
//     await Artist.create({ name: "Paul Chambers", instrumentId: bass.id });
//     await Artist.create({ name: "Ron Carter", instrumentId: bass.id });
//     await Artist.create({ name: "Ray Brown", instrumentId: bass.id });
//     await Artist.create({ name: "McCoy Tyner", instrumentId: piano.id });
//     await Artist.create({ name: "Sam Jones", instrumentId: piano.id });
//     await Artist.create({ name: "Wynton Kelly", instrumentId: piano.id });
//     await Artist.create({ name: "Elvin Jones", instrumentId: drums.id });
//     await Artist.create({ name: "Philly Joe Jones", instrumentId: drums.id });
//     await Artist.create({ name: "Roy Hanes", instrumentId: drums.id });
//     await Artist.create({ name: "Ella Fitzgerald", instrumentId: vocals.id });
//     await Artist.create({ name: "Sarah Vaughn", instrumentId: vocals.id });
//     await Artist.create({ name: "Louis Armstrong", instrumentId: vocals.id });
//     console.log("we syncd and seeded");

//     const port = 7422 || process.env.PORT;
//     app.listen(port, () => {
//       console.log(`tunin in on ${port}`);
//     });
//   } catch (ex) {
//     console.log(`darnnnnnnn ${ex}`);
//   }
// };

// start();

module.exports = { Artist, Instrument, sequelize };
