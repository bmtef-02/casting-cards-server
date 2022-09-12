const express = require('express');
const Contestant = require('../models/contestant');
const contestantsRouter = express.Router();
const cors = require("./cors");

contestantsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Contestant.find()
    .then(contestants => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(contestants);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Contestant.create(req.body)
    .then(contestant => {
        console.log(`Contestant Added: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contestants')
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Contestant.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

contestantsRouter.route('/:contestantId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Contestant.findById(req.params.contestantId)
    .then(contestant => {
        console.log(`Found contestant: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put(cors.corsWithOptions, (req, res, next) => {
    Contestant.findByIdAndUpdate(req.params.contestantId, { $set: req.body }, { new: true })
    .then(contestant => {
        console.log(`Updated contestant: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Contestant.findByIdAndDelete(req.params.contestantId)
    .then(contestant => {
        console.log(`Contestant deleted: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})

module.exports = contestantsRouter;