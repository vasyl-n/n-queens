/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// [
//   [0, 1, 0, 0], 0
//   [0, 0, 0, 0], 1
//   [0, 0, 0, 0], 2
//   [0, 0, 0, 0]  3
// ];
// t = new Board(test)
// console.log(t.hasAnyRowConflicts())
// console.log(t.hasAnyColConflicts())


window.findNRooksSolution = function(n, col = 0, row = 0) {
  var solution = new Board( {n: n} );
  var holdArr = [];
  var inner = function(col, row) {
    if ( row === n ) {
      return;
    }
    solution.togglePiece(row, col);
    if ( solution.hasAnyRowConflicts() ) {
      solution.togglePiece(row, col);
    }
    if ( solution.hasAnyColConflicts() ) {
      solution.togglePiece(row, col);
    }
    if ( col === n ) {
      col = 0;
      row++;
    }
    col++;
    inner(col, row);
  };
  inner(col, row);
  for ( var i in solution.attributes ) {
    holdArr.push(solution.attributes[i]);
  }
  holdArr.pop();
  return holdArr;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  for ( var i = 0; i < n; i++ ) {
    findNRooksSolution(n, i, 0);
    solutionCount++;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board( {n: n} );
  var holdArr = [];
  var count = 0;

  var objToTrack = {};

  if ( n === 0 ) { return []; }
  var numPieces = function() {
    return _.reduce(solution.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
  };


  var inner = function() {
  // if ( n === 6 ) debugger
    // debugger
    if ( numPieces() === n ) {
      return;
    }

    var randomNum = getRandomNumber(0, n * n)
    while ( objToTrack[randomNum] !== undefined ) {
      randomNum = getRandomNumber(0, n * n)
    }
    objToTrack[randomNum] = randomNum;

    var next = numToCoord(randomNum, n)
    var row = next[0];
    var col = next[1];

    solution.togglePiece(row, col);
    if ( solution.hasAnyRowConflicts() || solution.hasAnyColConflicts() || solution.hasAnyMajorDiagonalConflicts() || solution.hasAnyMinorDiagonalConflicts()) {
      solution.togglePiece(row, col);
    }

    if ( numPieces() === n ) {
      return;
    }

    if ( checkedAllBoard(objToTrack, n) ) {
      // debugger
      solution = new Board( {n: n} );
      objToTrack = {};
    }

    // if ( next.length === 0 ) {
    //   count += 1;
    //   next[1] = count;
    //   next[0] = 0;
    //   solution = new Board({n: n});
    // }
    inner();
  };

  inner();
  for ( var i in solution.attributes ) {
    holdArr.push(solution.attributes[i]);
  }
  holdArr.pop();
  return holdArr;
};

window.checkedAllBoard = function(obj, n) {
  var count = 0;
  for ( var i in obj ) {
    count ++
  }
  return count === n * n;
}

window.getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


window.getNextCoordinates = function(row, col, n) {
  col++;
  if ( col === n ) {
    col = 0;
    row = row + 1;
  }
  if ( row === n ) {
    return [];
    col = 0;
    row = 0;
  }
  return [row, col];
};

window.numToCoord = function(num, n) {
  if ( Math.floor(num / n) === n )return false;
  return [Math.floor(num / n), (num % n)]
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};