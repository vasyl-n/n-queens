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


window.convertToStr = function(n, number) {
  var toBase3 = Number(number).toString(n);
  var result = "";
  if ( n > toBase3.length ) {
    var howManyRemaining = n - toBase3.length
    for( var i = 0; i < howManyRemaining; i++ ) {
      result+= 0;
    }
  }
  result += toBase3;
  return result;
};

// [0, 0, 0, 0]


window.findNRooksSolution = function(n, start = 0) {
  if ( n === 1 ) return [[1]];
  if ( n === 0 ) return {n:0};
  var holdArr = [];
  var board = new Board({n: n});
  var boardCount = 0;

  var recurse = function(n, num) {
    board = new Board({n: n});
    var piecesToToggle = convertToStr(n, num);
    while ( thereAreDuplecates(piecesToToggle) ) {
      piecesToToggle = convertToStr(n, ++num)
    }
    for ( i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i])
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
      recurse(n, num += 1);
    }
    return board.attributes
  }

  var test = Object.values(recurse(n, start));
  test.pop();
  return test;
};


window.makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if ( n === 1 ) return 1;
  if ( n === 2 ) return 2;
  // debugger
  var board = new Board({n: n});
  var boardCount = 0;
  var pieces = (0).toString().repeat(n);
  var recurse = function(n, num, pieces) {
    //clear board

    var piecesToToggle = convertToStr(n, num);
    while ( thereAreDuplecates(piecesToToggle) ) {
      if ( piecesToToggle >= Number((n-1).toString().repeat(n)) ) return [];
      piecesToToggle = convertToStr(n, ++num);
    }
    for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
          for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }
      recurse(n, num += 1, piecesToToggle);
    }

    boardCount++;
      for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }
    return [n, num += 1, piecesToToggle];
  }
      // debugger
  var test = recurse(n, 0, pieces);
  var n = Number((test[0]-1).toString().repeat(test[0]));
  while ( test[0] <= n ) {
    if (test.length === 0) return boardCount;
    test = recurse(test[0], test[1], test[2]);
  }

  return boardCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, num) {
  if ( n === 1 ) return [[1]];
  if ( n === 0 ) return {n:0};
  if ( n === 2 ) return {n:2};
  if ( n === 3 ) return {n:3};
  var holdArr = [];
  var board = new Board({n: n});

  var recurse = function(n, num) {
    board = new Board({n: n});
    var piecesToToggle = convertToStr(n, num)
    while ( thereAreDuplecates(piecesToToggle) ) {
      piecesToToggle = convertToStr(n, num++)
    }
    for ( i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i])
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
      recurse(n, num += 1);
    }
    return board.attributes
  }
  var test = Object.values(recurse(n, 0));
  test.pop();
  return test;
};

var thereAreDuplecates = function(num){
  num = num.split('');
  var bucket = [];
  for (var i = 0; i < num.length; i++) {
    if(bucket.indexOf(num[i]) === -1) {
      bucket.push(num[i]);
    }
  }
  return bucket.length !== num.length;
};


// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  if ( n === 1 || n === 0 ) return 1;
  if ( n === 2 || n === 3 ) return 0;
  // debugger
  var board = new Board({n: n});
  var boardCount = 0;
  var pieces = (0).toString().repeat(n);
  var recurse = function(n, num, pieces) {

    var piecesToToggle = convertToStr(n, num);
    while ( thereAreDuplecates(piecesToToggle) ) {
      if ( piecesToToggle >= Number((n-1).toString().repeat(n)) ) return [];
      piecesToToggle = convertToStr(n, ++num);
    }
    for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMinorDiagonalConflicts() ||
      board.hasAnyMajorDiagonalConflicts() ) {
          for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }
      recurse(n, num += 1, piecesToToggle);
    }

    boardCount++;
      for ( var i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }
    return [n, num += 1, piecesToToggle];
  }
  var test = recurse(n, 0, pieces);
  var n = Number((test[0]-1).toString().repeat(test[0]));
  while ( test[0] <= n ) {
    if ( test.length === 0 ) return boardCount;
    test = recurse(test[0], test[1], test[2]);
  }

  return boardCount;
};