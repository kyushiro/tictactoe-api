let logic = {};

logic.hasWin = (board) => {
    let win = false;
    let winSign = null;

    // check rows
    board.map(row => {
        if (row[0] == row[1] && row[1] == row[2]) {
            win = true;
            winSign = row[0];
        }
    });

    // if no winning rows, check columns
    if (!win) {
        let col_array = [0, 1, 2];
        col_array.map(col => {
            if (board[0][cols] == board[1][cols] && board[1][cols] == board[2][cols]) {
                win = true;
                winSign = board[0][cols];
            }
        });
    }

    // if no winning cols, check diagonals
    if (!win) {
        // 0,0 1,1 2,2   0,2 1,1 2,0 
        if ((board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
            (board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
            win = true;
            winSign = board[0][0];
        }
    }

    result = {};
    result.win = win;
    if (result.win) result.sign = winSign;
    return result;
}


logic.fullboard = (board) => {
    full = true;
    board.map(r => {
        if (r.filter(x => x == null).length > 0) full = false;
    });
    return full;
}

module.exports = logic;