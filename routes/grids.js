const express = require('express');
const Grid = require('../models/grid');
const gridsRouter = express.Router();
const cors = require("./cors");

gridsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Grid.find()
    .then(grids => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(grids);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Grid.create(req.body)
    .then(grid => {
        console.log(`Grid Added: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /grids')
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Grid.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

gridsRouter.route('/:gridId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Grid.findById(req.params.gridId)
    .then(grid => {
        console.log(`Found grid: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put(cors.corsWithOptions, (req, res, next) => {
    Grid.findByIdAndUpdate(req.params.gridId, { $set: req.body }, { new: true })
    .then(grid => {
        console.log(`Updated grid: ${grid}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(grid);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
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