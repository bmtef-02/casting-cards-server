const express = require('express');
const Contestant = require('../models/contestant');
const contestantsRouter = express.Router();

contestantsRouter.route('/')
.get((req, res, next) => {
    Contestant.find()
    .then(contestants => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(contestants);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Contestant.create(req.body)
    .then(contestant => {
        console.log(`Contestant Added: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contestants')
})
.delete((req, res, next) => {
    Contestant.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

contestantsRouter.route('/:contestantId')
.get((req, res, next) => {
    Contestant.findById(req.params.contestantId)
    .then(contestant => {
        console.log(`Found contestant: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put((req, res, next) => {
    Contestant.findByIdAndUpdate(req.params.contestantId, { $set: req.body }, { new: true })
    .then(contestant => {
        console.log(`Updated contestant: ${contestant}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contestant);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
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