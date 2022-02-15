// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost/jazz_greats_db"
// );

// const Instrument = sequelize.define("instrument", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });

// const Artist = sequelize.define("artist", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });

// const start = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     await Instrument.create({ name: "tenor sax" });
//     await Instrument.create({ name: "alto sax" });
//     await Instrument.create({ name: "trumpet" });
//     await Instrument.create({ name: "guitar" });
//     await Instrument.create({ name: "bass" });
//     await Instrument.create({ name: "piano" });
//     await Instrument.create({ name: "drums" });
//     await Instrument.create({ name: "vocalists" });
//     await Artist.create({ name: "John Coltrane" });
//     await Artist.create({ name: "Sonny Rollins" });
//     await Artist.create({ name: "Joe Henderson" });
//     await Artist.create({ name: "Wayne Shorter" });
//     await Artist.create({ name: "Charlie Parker" });
//     await Artist.create({ name: "Cannonball Adderly" });
//     await Artist.create({ name: "Ornette Coleman" });
//     await Artist.create({ name: "Lee Morgan" });
//     await Artist.create({ name: "Clifford Brown" });
//     await Artist.create({ name: "Miles Davis" });
//     await Artist.create({ name: "Kenny Dorham" });
//     await Artist.create({ name: "Wes Montgomery" });
//     await Artist.create({ name: "Jim Hall" });
//     await Artist.create({ name: "Paul Chambers" });
//     await Artist.create({ name: "Ron Carter" });
//     await Artist.create({ name: "Ray Brown" });
//     await Artist.create({ name: "McCoy Tyner" });
//     await Artist.create({ name: "Sam Jones" });
//     await Artist.create({ name: "Wynton Kelly" });
//     await Artist.create({ name: "Elvin Jones" });
//     await Artist.create({ name: "Philly Joe Jones" });
//     await Artist.create({ name: "Roy Hanes" });
//     await Artist.create({ name: "Ella Fitzgerald" });
//     await Artist.create({ name: "Sarah Vaughn" });
//     await Artist.create({ name: "Nancy Wilson" });
//     console.log("we syncd and seeded");
//   } catch (ex) {
//     console.log(`darnnnnnnn ${ex}`);
//   }
// };

// module.exports = { start, Instrument, Artist };
