import express from 'express';

const app = express();
let PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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