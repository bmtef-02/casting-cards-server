const express = require('express');
const Grid = require('../models/grid');
const gridsRouter = express.Router();

gridsRouter.route('/')
.get((req, res, next) => {
    Grid.find()
    .then(grids => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(grids);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Grid.create(req.body)
    .then(grid => {
        console.log(`Grid Added: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /grids')
})
.delete((req, res, next) => {
    Grid.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

gridsRouter.route('/:gridId')
.get((req, res, next) => {
    Grid.findById(req.params.gridId)
    .then(grid => {
        console.log(`Found grid: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put((req, res, next) => {
    Grid.findByIdAndUpdate(req.params.gridId, { $set: req.body }, { new: true })
    .then(grid => {
        console.log(`Updated grid: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Grid.findByIdAndDelete(req.params.gridId)
    .then(grid => {
        console.log(`Grid deleted: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})

module.exports = gridsRouter;