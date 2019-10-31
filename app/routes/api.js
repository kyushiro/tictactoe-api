const express = require('express');
const router = express.Router();
const gameCtl = require('../controllers/game');

router.get('/about', (req, res, next) => {
    res.status(200).json({
        message: "This is a test app created by Christophe Ramsamy"
    })
});

router.get('/create-game', gameCtl.create);
router.get('/list-games', gameCtl.list);
router.get('/replay/:ref', gameCtl.replay);


module.exports = router;