let logic = {};

logic.hasWin = (board) => {
    let win = false;
    let winSign = null;

    // check rows
    board.map(row => {
        if (row[0] != null && row[0] == row[1] && row[1] == row[2]) {
            win = true;
            winSign = row[0];
        }
    });

    // if no winning rows, check columns
    if (!win) {
        // console.log("no win rows");
        let col_array = [0, 1, 2];
        col_array.map(cols => {
            if (board[0][cols] != null && board[0][cols] == board[1][cols] && board[1][cols] == board[2][cols]) {
                win = true;
                winSign = board[0][cols];
            }
        });
    }

    // if no winning cols, check diagonals
    if (!win) {
        // console.log("no win cols");
        // 0,0 1,1 2,2   0,2 1,1 2,0 
        if ((board[0][0] != null && (board[0][0] == board[1][1] && board[1][1] == board[2][2]))) {
            win = true;
            winSign = board[0][0];
        } else if ((board[0][2] != null && board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
            win = true;
            winSign = board[0][2];
        }
        // else console.log("no win diags");
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

logic.makemove = (board) => {
    console.log("entered make move");
    // get free spots
    let freerow = [];
    let freecol = [];
    board.map((row, rownum) => {
        row.map((col, colnum) => {
            if (col == null) {
                freerow.push(rownum);
                freecol.push(colnum);
            }
        })
    });

    // get number of free spots on gameboard
    let freespots = freerow.length;
    freespots--; // max index (0 based);

    // randow number, 0 - freespots
    let randCo = Math.floor(Math.random() * (freespots + 1));

    console.log(`Computer plays x at (${freerow[randCo]},${freecol[randCo]})`)

    board[freerow[randCo]][freecol[randCo]] = "x";
    return board;
}

module.exports = logic;