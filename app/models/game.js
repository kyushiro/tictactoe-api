var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
    game_ref: {
        type: String,
        required: true,
        unique: true
    },
    game_start: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    game_state: {
        type: String,
        enum: ['new', 'inprogress', 'complete'],
        default: 'new'
    },
    game_steps: []
});

module.exports = mongoose.model('Game', GameSchema);