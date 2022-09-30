const db = require('../config/connection');
const { User, Snippet, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
// const snippetSeeds = require('./snippetSeeds.json');
const categorySeeds = require('./categorySeeds.json')


db.once('open', async () => {
    try {
      await Snippet.deleteMany({});
      await User.deleteMany({});
      await Category.deleteMany({});

      await User.create(userSeeds);
      const categories = await Category.create(categorySeeds);
      const snippetSeeds = 
      [
      {
          "snippetText": `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
              <link rel="stylesheet" href="style.css">
              <title>Document</title>
          </head>
          <body>
              
          </body>
          </html>`,
          "snippetAuthor":"Sean",
          "category": categories[0]._id
      }
      ]
      console.log(snippetSeeds)
      for (let i = 0; i < snippetSeeds.length; i++) {
        let snippet = await Snippet.create(snippetSeeds[i]);
        // snippet.category = categories[0]._id;
        console.log(snippet, "message");
        const user = await User.findOneAndUpdate(
          { username: snippet.snippetAuthor },
          {
            $addToSet: {
              snippets: snippet._id,
            },
          }
        );
      }
      // console.log('all done!');
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
   
  });
  