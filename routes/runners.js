const express = require("express");

const router = express.Router();

const runnerQueries = require("../queries/runnerqueries");

function isValidId(request, response, next) {
  if (!isNaN(request.params.id)) return next();
  next(new Error("Invalid ID"));
}

router.get("/runners", (req, res) => {
  runnerQueries
    .getRunners()
    .then(runners => {
      res.json(runners);
    })
    .catch(console.error);
});

router.get("/runners/:id", (request, response) => {
  runnerQueries
    .read(request.params.id)
    .then(runners => {
      runners ? response.json({ runners }) : response.sendStatus(404);
    })
    .catch(console.error);
});

router.post("/runners", (request, response) => {
  runnerQueries
    .create(request.body)
    .then(runners => {
      console.log(request.body);
      response.status(201).json({ runners });
    })
    .catch(console.error);
});

router.delete("/runners/:id", (request, response) => {
  runnerQueries
    .delete(request.params.id)
    .then(() => {
      response.sendStatus(204);
    })
    .catch(console.error);
});

router.put("/runners/:id", (request, response) => {
  runnerQueries
    .update(request.params.id, request.body)
    .then(runners => {
      response.json({ runners: runners[0] });
    })
    .catch(console.error);
});

module.exports = router;
