
// These are all the conditions in which a player has won the game
// each item represents one winning condition (IE: first row represents
// the diagonal winning condition from the top left cell) and each 
// item within the row represents [row,col] to look at in the grid 
const winning_conditions = [
    [[0,0], [1,1], [2,2]],
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[2,0], [1,1], [0,2]]
]
function _setDisplayNone(...args) {
    args.forEach((x) => x.style.display = "none");
}

function _setDisplayBlock(...args) {
    args.forEach((x) => x.style.display = "block");
}

function _insertO_X_intoGrid(currGrid) {
    for (let i=0; i<currGrid.length; i++) {
        for (let j=0;j<currGrid[i].length; j++) {
            // you can only change one element at a time in the grid
            // so if any
            document.getElementById("_"+String(i)+String(j)).innerHTML = currGrid[i][j];
        }
    }
}

function _restoreDefaultColors() {
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            document.getElementById("_"+String(i)+String(j)).style.backgroundColor = 'rgba(11, 78, 145, 0.8)';
        }
    }
}

function checkIfWinner(grid) {
    for (const item of winning_conditions) {
        let cell_item = '';
        let count_good = 0;
        for (const curr_cell of item) {
            const curr_val = grid[curr_cell[0]][curr_cell[1]];
            if (cell_item === '') {
                cell_item = curr_val;
            }
            else if (cell_item !== curr_val) {
                break;
            }
            else {
                count_good++; 
            }
        }
        if (count_good === 2) {
            return [true, cell_item, item];
        }
    }
    return [false, '', null];
}

function checkIfStalemate(grid) {
    // stalemate if in every single path you can possibly win,
    // you have two different letters
    // so no path can ever have 3 in a row
    let possibleWinningConditions = winning_conditions.length; 
    for (const item of winning_conditions) {
        let cell_item = '';
        for (const curr_cell of item) {
            const curr_val = grid[curr_cell[0]][curr_cell[1]];
            // its fine if the cell hasnt been filled in yet
            // only want to consider case where it has been filled in and 
            // there are two different letters in the win condition 
            if (curr_val === '') {
                continue;
            }
            else if (cell_item === '') {
                cell_item = curr_val;
            }
            else if (cell_item !== curr_val) {
                possibleWinningConditions--;
                break;
            }
        }
    }
    return possibleWinningConditions === 0;
}


function _setDisplayGrid(obj) {
    obj.style.display = 'grid';
    obj.style.gridTemplateColumns = 'repeat(3, minmax(50px, 1fr))';
}

function _highlightWinningCells(winningLoc) {
    for (let i=0; i< winningLoc.length; i++) {
        const winRow = winningLoc[i][0];
        const winCol = winningLoc[i][1];
        document.getElementById("_"+String(winRow)+String(winCol)).style.backgroundColor = 'green';
    }
}

function deleteChildrenGreater_EqualThanT(div, t) {
    let i =0;
    while (i<div.children.length) {
        const child = div.children[i];
        if (child.getAttribute('timestep') >= t) {
            div.removeChild(child);
            continue; 
        }
        else {
            i++;
        }
    }
}

function initializeGrid(grid) {
    let curr_gc = 0;
    for (let i=0; i<3;i++) {
        for (let j=0; j<3; j++) {
            grid[curr_gc].id = "_"+String(i) + String(j);
            curr_gc++;
        }
    }
}




export {_setDisplayBlock, initializeGrid, _highlightWinningCells ,_setDisplayNone, _insertO_X_intoGrid, _restoreDefaultColors, _setDisplayGrid,checkIfWinner, checkIfStalemate,
    deleteChildrenGreater_EqualThanT};