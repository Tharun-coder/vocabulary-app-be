const { APP_ID, APP_KEY } = require("../helpers/environment");
const http = require("https");
const dictionary = require("../models/dictionary");
const router = require("express").Router();

//Getting data from Mongo DB through End Point
router.get("/", async (req, res) => {
  try {
    let data = await dictionary.find();
    res.status(200).json({
      message: "Your data is here",
      data,
    });
  } catch {
    console.log(err);
    res.sendStatus(500);
  }
});

//adding word and its dictionary to mongo db from oxford dictionaries API
router.post("/:word", async (req, res) => {
  try {
    //Oxford Dictionary API Fetch
    const options = {
      host: "od-api.oxforddictionaries.com",
      port: 443,
      path: `/api/v2/entries/en-us/${req.params.word}?fields=definitions`,
      method: "GET",
      headers: {
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    };

    http.get(options, (resp) => {
      let body = "";
      resp.on("data", (d) => {
        body += d;
      });
      resp.on("end", async () => {
        let parsed = JSON.parse(body);

        let data = parsed.results[0].lexicalEntries.map((e) => {
          let category = e.lexicalCategory.id;
          let definitions = e.entries[0].senses.map((e) => e.definitions[0]);
          return { category, definitions };
        });

        await dictionary.create({
          word: req.params.word,
          items: data,
        });
        res.status(200).json({
          data,
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
