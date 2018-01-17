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
    var howManyRemaining = n - toBase3.length;
    for( var i = 0; i < howManyRemaining; i++ ) {
      result+= 0;
    }
  }
  result += toBase3;
  return result;
};


window.findNRooksSolution = function(n, num = 0) {
  if ( n === 1 ) {
    return [[1]];
  }
  if ( n === 0 ) {return {n:0};}
  var holdArr = [];
  var board = new Board({n: n});
  var boardCount = 0;

  var recurse = function(n, num) {
    board = new Board({n: n});
    var piecesToToggle = convertToStr(n, num);
    while ( thereAreDuplecates(piecesToToggle) ) {
      piecesToToggle = convertToStr(n, ++num);
    }
    for ( i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
      recurse(n, num += 1);
    }
    return board.attributes;
  };

  var test = Object.values(recurse(n, num));
  test.pop();
  return test;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  debugger;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, num) {
  if ( n === 1 ) {return [[1]];}
  if ( n === 0 ) {return {n:0};}
  if ( n === 2 ) {return {n:2};}
  if ( n === 3 ) {return {n:3};}
  var holdArr = [];
  var board = new Board({n: n});

  var recurse = function(n, num) {
    board = new Board({n: n});
    var piecesToToggle = convertToStr(n, num);
    while ( thereAreDuplecates(piecesToToggle) ) {
      piecesToToggle = convertToStr(n, num++);
    }
    for ( i = 0; i < piecesToToggle.length; i++ ) {
      board.togglePiece(i, piecesToToggle[i]);
    }

    if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
      recurse(n, num += 1);
    }
    return board.attributes;
  };
  var test = Object.values(recurse(n, 0));
  test.pop();
  return test;
};

var thereAreDuplecates = function(num){
  num = num.split('');
  var bucket = [];
  for ( var i = 0; i < num.length; i++ ) {
    if ( bucket.indexOf(num[i]) === -1 ) {
      bucket.push(num[i]);
    }
  }
  return bucket.length !== num.length;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other





window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};