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
      },
      {
        "snippetText": `
        /* Tablets - header changes color */
@media screen and (max-width: 992px) {
  header {
    background: #772014;
  }
}

/* Large smartphones - navbar changes color */
@media screen and (max-width: 768px) {
  nav {
    background-color: #bb8588;
  }
}

/* Small smartphones - image placeholders change color */
@media screen and (max-width: 576px) {
  .sample-img {
    background-color: #8ac4ff;
  }
}

        `,
        "snippetAuthor":"Sean",
        "category": categories[1]._id
      },
      {
        "snippetText": `
        main {
          /* Turns this element into a flexbox */
          display: flex;
          /* Forces elements to the next line if they don't fit */
          flex-wrap: wrap;
          margin-top: 2%;
        }
        
        .main-header {
          display: flex;
          /* Defines how to distribute the empty space between child elements */
          justify-content: space-between;
          padding: 60px;
          background: #13293d;
          color: #fff;
        }
        
        .card {
          /* A flex-basis of 200px sets the starting width */
          /* A flex-grow value of 1 allows the elements to evenly grow to fill the remaining space */
          flex: 1 0 200px;
          padding: 10px;
          text-align: center;
          border-style: solid;
          border-width: 1px;
        }
        
        .card header {
          padding: 20px;
          background: #13293d;
          color: #fff;
        }
        
        .card.camera {
          /* With a flex-grow value of 2, this element grows twice as wide as others */
          /* The second value, flex-shrink, defines how the element will shrink if it can't fit */
          flex: 2 1 200px;
        }
        
        `,
        "snippetAuthor":"Sean",
        "category": categories[1]._id
      },
      {
        "snippetText": `
        .products {
          display: flex;
          flex-direction: row;
          /* Centers along the main axis determined by flex-direction */
          justify-content: center;
          /* Centers along the opposite axis */
          align-items: center;
          width: 90%;
          /* Uses the height of the viewport */
          height: 100vh;
          margin: 0 auto;
          border-style: solid;
          border-width: 2px;
        }
        `,
        "snippetAuthor":"Sean",
        "category": categories[1]._id
      },
      {
        "snippetText": `
        for (var i = 0; i < 5; i++) {
          // This is the block of code that will run each time
          console.log("This is the current value of i: " + i + ".");
      };
        while (i < 10) {
            text += "The number is " + i;
            i++;
          };
        
        `,
        "snippetAuthor":"Sean",
        "category": categories[2]._id
      },
      {
        "snippetText": `
        function setTime() {
          // Sets interval in variable
          var timerInterval = setInterval(function() {
            secondsLeft--;
        
            if(secondsLeft === 0) {
              // Stops execution of action at set interval
              clearInterval(timerInterval);
              // Calls function to create and append image
              sendMessage();
            }
        
          }, 1000);
        }
        `,
        "snippetAuthor":"Sean",
        "category": categories[2]._id
      },
      {
        "snippetText": `
        // Access toggle switch HTML element
var themeSwitcher = document.querySelector('#theme-switcher');
var container = document.querySelector('.container');

// Set default mode to dark
var mode = 'dark';

// Listen for a click event on toggle switch
themeSwitcher.addEventListener('click', function () {
  // If mode is dark, apply light background
  if (mode === 'dark') {
    mode = 'light';
    container.setAttribute('class', 'light');
  }
  // If mode is light, apply dark background
  else {
    mode = 'dark';
    container.setAttribute('class', 'dark');
  }
});

/* 
  htmlElement.addEventListener(eventName, function);

  - Replace htmlElement with the element that should respond to the event.
  - Replace eventName with a string for the type of event. (e.g. "click", "change", "focus", etc.)
  - Replace function with the function that should be called each time the event occurs.
*/

        `,
        "snippetAuthor":"Sean",
        "category": categories[2]._id
      },
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
  