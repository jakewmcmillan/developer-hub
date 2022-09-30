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
      },
      {
        "snippetText": `
        <!DOCTYPE html>
<html lang="en">
  
<head>
  <meta charset="UTF-8" />
  <title>jQuery DOM elements</title>
  <link rel="stylesheet" href="./assets/css/jass.css" />
  <link rel="stylesheet" href="./assets/css/style.css" />

</head>

<body class="bg-dark text-light text-center">
  <!-- This empty <div> will anchor the elements we create with jQuery. -->
  <div class="m-5" id="root"></div>

  <!-- Added link to the jQuery library -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

  <script type="text/javascript" src="./assets/js/script.js"></script>
</body>

</html>
        `,
        "snippetAuthor":"Sean",
        "category": categories[0]._id
      },
      {
        "snippetText": `
        <body>
  <!-- Bootstrap provides ready to use classes to style elements -->
  <main class="d-flex min-vh-100 bg-dark">
    <div class="container-fluid my-auto">
      <h1 class="display-2 text-center text-light">Cards</h1>
      <div class="row justify-content-center">
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
       
        `,
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
  