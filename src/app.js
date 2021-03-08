// Express init
const express = require("express");
const app = express();

// port for deploy (not used)
const PORT = process.env.PORT || 3000;
// local port
const port = 3000;

// Axios and cherrio
const axios = require("axios");
const cheerio = require("cheerio");

// baseUrl
const url = "https://infeksiemerging.kemkes.go.id/dashboard/covid-19";

async function getData() {
  try {
    const data = {};
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const parent = $(".container").children().find(".row").eq(1).children();

    $(parent).each((i, e) => {
      // Find title
      const ft = $(e).find("b");
      const fst = $(e).find(".data-sub-title");

      // Find Value
      const fv = $(e).find("h3");

      const title = `${$(ft[0]).text() + $(fst[0]).text()}`;
      const value = `${$(fv[0]).text()}`;

      data[i] = { title, value };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  res.send(await getData());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
