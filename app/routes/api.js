const express = require('express');
const router = express.Router();

router.get('/about', (req, res, next) => {
    res.status(200).json({
        message: "This is a test app created by Christophe Ramsamy"
    })
});

module.exports = router;