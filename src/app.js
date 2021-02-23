const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://infeksiemerging.kemkes.go.id/dashboard/covid-19";

async function getData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const biru = $(".container").children().find(".row").eq(1).children();

    $(biru).each((i, e) => {
      const data = {};
      // Find title
      const title = $(e).find("b").text();
      // Find Value
      const value = $(e).find("h3").text();

      data[i] = { title, value };
      console.log(data);
    });
    // console.log(biru);
  } catch (error) {
    console.log(error);
  }
}

getData();
