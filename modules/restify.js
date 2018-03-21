const fs = require('fs'),
  mongoose = require('mongoose'),
  baseRouter = require('./base-route');

/**
 * Helper get function.
 *
 * @param path
 * @returns {*}
 */
const getFiles = path => fs.readdirSync(path);

/**
 * Capitalize helper.
 *
 * @param model
 * @returns {string}
 */
const capitalize = model => `${model.slice(0, 1).toUpperCase()}${model.slice(1)}`;

/**
 * The main module will take the app, and a path to the models folder.  It will
 * find all models, register them with Mongoose, then create a route with the
 * following:
 *
 *  - GET endpoint, for getting all models
 *  - GET :id endpoint, for getting a single model
 *  - POST endpoint, for creating a new endpoint
 *  - PUT endpoint, for updating a model
 *  - DELETE endpoint, for deleting a model
 *
 * @param app
 * @param srcPath
 */
module.exports = (app, srcPath) => {
  const files = getFiles(srcPath);
  files.forEach(file => {
    const route = file.split('.')[0].toLowerCase();

    // Load the model and register with mongoose.
    require(`../models/${file}`);

    // Create crud endpoints for the model.
    app.use(`/api/${route}`, baseRouter(route, mongoose.model(capitalize(route))));
  });
};