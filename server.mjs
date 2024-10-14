import express from 'express';
import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes.mjs';
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import coinRoutes from './routes/coinRoutes.mjs'
// import error from './utilities/error.mjs';

// Api Keys
let apiKeys = ['perscholas', 'ps-example', 'hJAsknw-L198sAJD-l3kasx'];

// Create an instance of express
const app = express();
let PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Api Middleware
app.use('/api', function (req, res, next) {
  var key = req.query['api-key'];

  // Check for the absence of a key.
  if (!key) next(error(400, "API Key Required"));

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) next(error(401, 'Invalid API Key'))

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
});

// Routes
app.use('/api/wallets', walletRoutes);
app.use('/api/blockchains', blockchainRoutes);
app.use('/api/coins', coinRoutes);

//More Middleware for error handling and 404 not found
app.use((req, res, next) => {
  next(error(404, "Resources Not Found"))
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});


app.use(bodyParser.json());  // For parsing JSON bodies

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Create and use at least two pieces of custom middleware.
// Create and use error-handling middleware.
// Use at least three different data categories (e.g., users, posts, or comments).
// Utilize reasonable data structuring practices.
// Create GET routes for all data that should be exposed to the client.
// Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
// Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
// Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.
// Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.
// Utilize route parameters, where appropriate.
// Adhere to the guiding principles of REST.
// Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
// Use simple CSS to style the rendered views.
// Include a form within a rendered view that allows for interaction with your RESTful API.
// Utilize reasonable code organization practices.
// Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
// Commit frequently to the git repository.
// Include a README file that contains a description of your application.
// Level of effort displayed in creativity, presentation, and user experience.