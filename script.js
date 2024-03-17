console.log("her ligger javascript");


// ********************* Model ***************************
// maze data in JSON
const mazeData={
  "rows": 4,
  "cols": 4,
  "start": {"row": 0, "col": 2},
  "goal": {"row": 2, "col": 3},
  "maze":
  [
    [{"row":0,"col":0,"north":true,"east":true,"west":true,"south":false},
     {"row":0,"col":1,"north":true,"east":false,"west":true,"south":false},
     {"row":0,"col":2,"north":true,"east":false,"west":false,"south":true},
     {"row":0,"col":3,"north":true,"east":true,"west":false,"south":false}],
    [{"row":1,"col":0,"north":false,"east":false,"west":true,"south":true},
     {"row":1,"col":1,"north":false,"east":true,"west":false,"south":true},
     {"row":1,"col":2,"north":true,"east":false,"west":true,"south":false},
     {"row":1,"col":3,"north":false,"east":true,"west":false,"south":true}],
    [{"row":2,"col":0,"north":true,"east":false,"west":true,"south":false},
     {"row":2,"col":1,"north":true,"east":true,"west":false,"south":true},
     {"row":2,"col":2,"north":false,"east":true,"west":true,"south":false},
     {"row":2,"col":3,"north":true,"east":true,"west":true,"south":false}],
    [{"row":3,"col":0,"north":false,"east":false,"west":true,"south":true},
     {"row":3,"col":1,"north":true,"east":false,"west":false,"south":true},
     {"row":3,"col":2,"north":false,"east":false,"west":false,"south":true},
     {"row":3,"col":3,"north":false,"east":true,"west":false,"south":true}]
  ]
}
  const mazeContainer=document.getElementById('maze');
  const rows=mazeData.rows;
  const cols=mazeData.cols;
  const maze=mazeData.maze;

// ********************* View ***************************

//initializing maze grid
for(let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        if (i === mazeData.start.row && j === mazeData.start.col) {
            cell.classList.add('start');
        } else if (i === mazeData.goal.row && j === mazeData.goal.col) {
            cell.classList.add('goal');
        }

        mazeContainer.appendChild(cell);
    }
}

//displaying of walls in maze
maze.forEach((row, i) => {
    row.forEach((cell, j) => {
        const currentCell = mazeContainer.children[i * cols + j];
        // removing borders
        if (cell.north) currentCell.style.borderTop = "none";
        if (cell.east) currentCell.style.borderRight = "none";
        if (cell.south) currentCell.style.borderBottom = "none";
        if (cell.west) currentCell.style.borderLeft = "none";
        if (!cell.north && !cell.east && !cell.south && !cell.west) {
            currentCell.classList.add('wall', 'no-border');
        }
    });
});
// ********************* Controller ***************************
//Depth- first search algorithm
function dfs (row, col, path){
    if (row <0 || col < 0 || row >= rows || col >= cols) return;
    const currentCell=mazeContainer.children[row * cols + col];
    if (currentCell.classList.contains('path') || currentCell.classList.contains('wall')) return;

    path.push({row, col});
    currentCell.classList.add('path');

    if (row===mazeData.goal.row && col=== mazeData.goal.col){
        return;
    }

    dfs(row - 1, col, path); 
    dfs(row, col + 1, path); 
    dfs(row + 1, col, path);
    dfs(row, col - 1, path);

    if(path[path.length - 1].row === row && path[path.length - 1].col === col){
        path.pop();
        currentCell.classList.remove('path');
    }
}

const path=[];
dfs(mazeData.start.row, mazeData.start.col, path);
