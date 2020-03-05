module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        res.json(err);
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json(err);
    } else if (err.name === "NotFound") {
        res.status(404).json(err);
    } else {
        res.status(500).json(err);
    }
};