const Game = require("../models/game");
let logic = require('./logic');
let ctrl = {};

ctrl.create = async (req, res, next) => {
    try {
        let game = new Game();
        game.game_ref = Math.random().toString(36).substr(2, 7);
        // init game board
        game.game_steps = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        await game.save();
        res.status(200).json({
            game: game.game_ref
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            msg: "could not create game",
            error: ex
        });
    }
};

ctrl.list = async (req, res, next) => {
    try {
        let games = await Game.find({
            game_state: "complete"
        });

        res.status(200).json({
            "games": games.map(x => x.game_ref)
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            msg: "could not fetch list",
            error: ex
        });
    }

};

ctrl.replay = async (req, res, next) => {
    try {
        let ref = req.params.ref;
        let game = await Game.find({
            "game_ref": ref
        });
        let steps = game[0].game_steps;

        res.status(200).json({
            steps: steps
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            msg: "could not fetch replay",
            error: ex
        });
    }
};

ctrl.ws_play = async (msg) => {
    msg = JSON.parse(msg);
    let game = await Game.find({
        "game_ref": msg.ref
    });
    game = game[0];
    game.game_state = "inprogress";
    game.game_steps.push(msg.board);
    await game.save();


    let gamewin = logic.hasWin(msg.board);
    if (gamewin.win) return {
        board: msg.board,
        win: gamewin
    };
    let fullboard = logic.fullBoard(msg.board);

    msg.board = logic.newMove(msg.board);



}



module.exports = ctrl;