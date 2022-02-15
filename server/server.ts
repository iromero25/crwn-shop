/**
 * the whole reason we are creating our own server is because Stripe requires
 * a secret key (provided when we create an account) to be provided to handle/
 * keep track of payments. Since the handling of this secret needs to be done
 * at the backend (cannot be safely  done at the  front-end), then we need to
 * create this  server that handles the stripe payment through  the `/payment`
 * endpoint.
 */
import path from "path";
import Stripe from "stripe";
import express from "express";
import bodyParser from "body-parser";
import authorizeFirebaseToken from "./authorisation";
import { getFirebaseUserRef } from "./firebase.server.utils";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// following line needs to be done after deciding how to load the .env
// because that defines how we get stripe's secret key:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// we serve the `index.html` file and all static files (including the bundles)
// from the current folder ONLY WHEN IN PRODUCTION as the server.js is created
// inside the `buils` folder. For  development  there  is  no need to worry as
// create-react-app serves all the required files for us
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname)));

  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
}

// this is the endpoint justifying this server file: we handle the stripe payment
// in the backend to keep the STRIPE_SECRET_KEY safe. Remember the `proxy` config
// at `package.json` is required so the frontend knows where to redirect local
// requests
app.post("/payment", async (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  if (process.env.NODE_ENV !== "production") {
    res.status(200).send({ sucess: "success" });
  } else {
    try {
      const stripeResponse = await stripe.charges.create(body);
      res.status(200).send({ sucess: stripeResponse });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
});

app.get("/getUser", authorizeFirebaseToken, (_req, res) => {
  const userId: string = res.locals.authorizedUserId;
  getFirebaseUserRef(userId)
    .get()
    .then(userSnapshot =>
      userSnapshot.exists ? { id: userId, ...userSnapshot.data() } : null
    )
    .then(userData => res.status(200).json(userData))
    .catch(() => res.status(500).json({ error: "server: error at /getUser endpoint" }));
});

app.post("/createUser", authorizeFirebaseToken, (req, res) => {
  const userId: string = res.locals.authorizedUserId;
  const { displayName, email, additionalData } = req.body;
  const userRef = getFirebaseUserRef(userId);
  userRef
    .get()
    .then(userSnapshot => {
      if (!userSnapshot.exists) {
        return userRef.set({
          displayName,
          email,
          createdAt: new Date(),
          ...additionalData,
        });
      }
      return userSnapshot.data();
    })
    .then(userData => res.status(200).send({ id: userId, ...userData }))
    .catch(() =>
      res.status(500).send({ error: "server: error at /createUser endpoint" })
    );
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// firebaseAdmin
//   .app()
//   .auth()
//   .getUser("8nPRrldsJtPRnCagFE52CSmmcA43")
//   .then(userRecord => console.log(userRecord));
