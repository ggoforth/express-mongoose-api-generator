const express = require('express');

module.exports = (route, model) => {
  /**
   * Each model should get a fresh instance of the router.
   */
  const router = express.Router();

  /**
   * GET all models
   */
  router.get('/', (req, res, next) => {
    model.find({})
      .then(modelData => {
        res.json(modelData);
      });
  });

  /**
   * Get the model schema, useful for populating forms on the front end.
   */
  router.get('/schema', (req, res, next) => {
    res.json({
      name: model.modelName,
      schema: model.schema.obj
    });
  });

  /**
   * Get a single model.
   */
  router.get('/:id', (req, res, next) => {
    model.findById(req.params.id)
      .then(modelData => {
        res.json(modelData);
      });
  });

  /**
   * Create a new model
   */
  router.post('/', (req, res, next) => {
    const data = req.body,
      instance = new model(data);

    instance.save()
      .then(() => {
        res.json(instance);
      });
  });

  /**
   * Update a model.
   */
  router.put('/:id', async (req, res, next) => {
    try {
      const instance = await model.findById(req.params.id);

      if (!instance) {
        const message = `Could not find an instance with id ${req.params.id}`,
          error = new Error(message);
        return next(error);
      }

      instance.set(req.body);

      instance.save()
        .then(() => {
          res.json(instance);
        });
    } catch (err) {
      next(err);
    }
  });

  // TODO: add delete route

  return router;
};