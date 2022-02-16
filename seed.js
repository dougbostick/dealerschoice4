// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost/jazz_greats_db"
// );

const serverImports = require("./server");
const Artist = serverImports.Artist;
const Instrument = serverImports.Instrument;
const sequelize = serverImports.sequelize;

const start = async () => {
  try {
    await sequelize.sync({ force: true });
    const tenor_sax = await Instrument.create({ name: "tenor sax" });
    const alto_sax = await Instrument.create({ name: "alto sax" });
    const trumpet = await Instrument.create({ name: "trumpet" });
    const guitar = await Instrument.create({ name: "guitar" });
    const bass = await Instrument.create({ name: "bass" });
    const piano = await Instrument.create({ name: "piano" });
    const drums = await Instrument.create({ name: "drums" });
    const vocals = await Instrument.create({ name: "vocalists" });
    await Artist.create({ name: "John Coltrane", instrumentId: tenor_sax.id });
    await Artist.create({ name: "Sonny Rollins", instrumentId: tenor_sax.id });
    await Artist.create({ name: "Joe Henderson", instrumentId: tenor_sax.id });
    await Artist.create({ name: "Wayne Shorter", instrumentId: tenor_sax.id });
    await Artist.create({ name: "Charlie Parker", instrumentId: alto_sax.id });
    await Artist.create({
      name: "Cannonball Adderly",
      instrumentId: alto_sax.id,
    });
    await Artist.create({ name: "Ornette Coleman", instrumentId: alto_sax.id });
    await Artist.create({ name: "Lee Morgan", instrumentId: trumpet.id });
    await Artist.create({ name: "Clifford Brown", instrumentId: trumpet.id });
    await Artist.create({ name: "Miles Davis", instrumentId: trumpet.id });
    await Artist.create({ name: "Kenny Dorham", instrumentId: trumpet.id });
    await Artist.create({ name: "Wes Montgomery", instrumentId: guitar.id });
    await Artist.create({ name: "Jim Hall", instrumentId: guitar.id });
    await Artist.create({ name: "Paul Chambers", instrumentId: bass.id });
    await Artist.create({ name: "Ron Carter", instrumentId: bass.id });
    await Artist.create({ name: "Ray Brown", instrumentId: bass.id });
    await Artist.create({ name: "McCoy Tyner", instrumentId: piano.id });
    await Artist.create({ name: "Sam Jones", instrumentId: piano.id });
    await Artist.create({ name: "Wynton Kelly", instrumentId: piano.id });
    await Artist.create({ name: "Elvin Jones", instrumentId: drums.id });
    await Artist.create({ name: "Philly Joe Jones", instrumentId: drums.id });
    await Artist.create({ name: "Roy Hanes", instrumentId: drums.id });
    await Artist.create({ name: "Ella Fitzgerald", instrumentId: vocals.id });
    await Artist.create({ name: "Sarah Vaughn", instrumentId: vocals.id });
    await Artist.create({ name: "Louis Armstrong", instrumentId: vocals.id });
    console.log("we syncd and seeded");
    process.exit();
  } catch (ex) {
    console.log(`darnnnnnnn ${ex}`);
  }
};

start();
