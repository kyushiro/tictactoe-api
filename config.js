let config = {};

config.port = process.env.PORT || 3000;

config.mongo = {
    'keySalt': 'nodetictactoesecret123!',
    'database': "mongodb://data.techsphere.io:27017/tictactoe-test"
}

module.exports = config;