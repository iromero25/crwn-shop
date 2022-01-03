/**
 * the whole reason we are creating our own server is because Stripe requires
 * a secret key (provided when we create an account) to be provided to handle/
 * keep track of payments. Since the handling of this secret needs to be done
 * at the backend (cannot be safely  done at the  front-end), then we need to
 * create this  server that handles the stripe payment through  the `/payment`
 * endpoint.
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// following line needs to be done after deciding how to load the .env
// because that defines how we get stripe's secret key:
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// we serve the `index.html` file and all static files (including the bundles)
// from the `build` folder ONLY WHEN IN PRODUCTION as there is no  need to do
// this in development: create-react-app serves all the required files for us
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// this is the endpoint justifying this server file: we handle the stripe payment
// in the backend to keep the STRIPE_SECRET_KEY safe. Remember the `proxy` config
// at `package.json` is required so the frontend knows where to redirect local
// requests
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ sucess: stripeRes });
    }
  });
});

app.listen(port, error => {
  if (error) throw error;
  console.log(`server running on port ${port}`);
});
