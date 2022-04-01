require("dotenv").config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const yargsObj = yargs(hideBin(process.argv)).argv;
const { client, connection } = require("./db/connection");
const Movie = require("./utils/index");

const app = async (yargsObj) => {
  const collection = await connection();
  const movie = new Movie(yargsObj.title, yargsObj.actor);
  try {
    if (yargsObj.add) {
      await movie.add(collection);
    } else if (yargsObj.list) {
      const movies = await movie.list(collection);
      console.log(movies);
    } else if (yargsObj.update) {
      movie.update();
    } else if (yargsObj.delete) {
      await movie.delete(collection);
    } else {
      console.log("Incorrect command");
    }
    await client.close();
  } catch (error) {
    await client.close();
    console.log(error);
  }
};
app(yargs.argv);
