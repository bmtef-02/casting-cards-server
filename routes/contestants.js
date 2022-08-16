const express = require('express');
const contestantsRouter = express.Router();

contestantsRouter.route('/')
.get((req, res) => {
    res.end('Will send you all the contestants to you');
})
.post((req, res) => {
    res.end(`Will add the contestant: ${req.body.lastName}, ${req.body.firstName}`)
})
.put((req, res) => {
    res.end('PUT operation not supported on /contestants')
})
.delete((req, res) => {
    res.end('Deleting all contestants');
})

module.exports = contestantsRouter;