const express = require("express");
require("dotenv").config();
const paystack = require("paystack")(process.env.PAYSTACK_KEY);

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.type("html").send(html));
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from STEPHEN!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;

const router = express();
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/new-access-code", function (req, res) {
  // var customerid = req.params.customerid;
  // var cartid = req.params.cartid;

  // you can then look up customer and cart details in a db etc
  // I'm hardcoding an email here for simplicity
  amountinkobo = process.env.TEST_AMOUNT * 100;

  if (isNaN(amountinkobo) || amountinkobo < 2500) {
    amountinkobo = 2500;
  }
  email = process.env.SAMPLE_EMAIL;

  // all fields supported by this call can be gleaned from
  // https://developers.paystack.co/reference#initialize-a-transaction
  paystack.transaction.initialize(
    {
      email: email, // a valid email address
      amount: amountinkobo, // only kobo and must be integer
      metadata: {
        custom_fields: [
          {
            display_name: "Started From",
            variable_name: "started_from",
            value: "sample charge card backend",
          },
          {
            display_name: "Requested by",
            variable_name: "requested_by",
            value: req.headers["user-agent"],
          },
          {
            display_name: "Server",
            variable_name: "server",
            value: req.headers.host,
          },
        ],
      },
    },
    function (error, body) {
      if (error) {
        res.send({ error: error });
        return;
      }
      res.send(body.data.access_code);
    }
  );
});
router.post("/get-reference", function (req, res) {
  console.log(req.body);
  console.log(Date.now());

  let amount = req.body?.amount ? req.body.amount : 1000;
  let email = req.body?.email ? req.body.email : "example@gmail.com";

  //unifia-airtime-app.herokuapp.com/generate-reference
  // you can then look up customer and cart details in a db etc
  // I'm hardcoding an email here for simplicity
  //amountinkobo = process.env.TEST_AMOUNT * 100;
  https: amountinkobo = amount * 100;
  if (isNaN(amountinkobo) || amountinkobo < 2500) {
    amountinkobo = 2500;
  }
  // all fields supported by this call can be gleaned from
  // https://developers.paystack.co/reference#initialize-a-transaction
  console.log("All fields supported by this call can be");
  paystack.transaction.initialize(
    {
      email: email, // a valid email address
      amount: amountinkobo, // only kobo and must be integer
      metadata: {
        custom_fields: [
          {
            display_name: "Started From",
            variable_name: "started_from",
            value: "sample charge card backend",
          },
          {
            display_name: "Requested by",
            variable_name: "requested_by",
            value: req.headers["user-agent"],
          },
          {
            display_name: "Server",
            variable_name: "server",
            value: req.headers.host,
          },
        ],
      },
    },
    function (error, body) {
      if (error) {
        res.send({ error: error });
        return;
      }
      res.send({ ...body });
    }
  );
});

router.get("/verify/:reference", function (req, res) {
  var reference = req.params.reference;
  console.log(req.params);
  console.log(Date.now());
  paystack.transaction.verify(reference, function (error, body) {
    if (error) {
      res.send({ error: error });
      return;
    }
    if (body.data.success) {
      // save authorization
      var auth = body.authorization;
    }
    res.send({
      ...body,
    });
  });
});

router.get("/wallet/:email", function (req, res) {
  var email = req.params.email;
  res.send({
    balance: 2000,
    email,
  });
});

// const server = router.listen(process.env.port, () => {
//   const port = server.address().port;
//   console.log(`Express is working on port ${port}`);
// });

router.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

//https://unifia.herokuapp.com/confirm-purchase?invoice_no=67
