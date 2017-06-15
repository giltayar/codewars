function solvePuzzle(clues) {
  console.log('clues', clues)
  return solve(nextSkyScraperState({ clues,
    board: generateInitialBoard(clues.length / 4),
    boardRows: clues.length / 4,
    boardColumns: clues.length / 4,
    clueI: undefined,
    row: undefined,
    col: undefined,
    direction: undefined
  }))
}

function generateInitialBoard(boardLength) {
  const board = new Array(boardLength)

  for (let i = 0; i < boardLength; ++i) {
    board[i] = new Array(boardLength)
    for (let j = 0; j < boardLength; ++j) {
      board[i][j] = 0
    }
  }

  return board
}

function solve(state, level = 0) {
  let nextState = state
  for (;;) {
    console.log(`${indent(level)}incrementing...`, nextState.clueI, nextState.row, nextState.col, '\n', nextState.board)
    let incrementedSkyScraperState = incrementSkyScraperState(nextState)
    while (incrementedSkyScraperState && !satisfiesConstraints(incrementedSkyScraperState))
      incrementedSkyScraperState = incrementSkyScraperState(incrementedSkyScraperState)

    if (!incrementedSkyScraperState) {
      nextState = state
      console.log(`${indent(level)}switching back to`, nextState.clueI, nextState.row, nextState.col, '\n', nextState.board)
    }
    else {
      nextState = incrementedSkyScraperState
      console.log(`${indent(level)}using incremented\n`, nextState.board)
    }
    // console.log(`${indent(level)}recursing`)
    // const solution = solve(incrementedSkyScraperState, level + 1)
    // if (solution)
    //   return solution
    console.log(`${indent(level)}next...`, nextState.clueI, nextState.row, nextState.col)
    const nextState2 = nextSkyScraperState(nextState)
    console.log(`${indent(level)}...to`, nextState2.clueI, nextState2.row, nextState2.col, '\n', nextState2.board)
    const solution = solve(nextState2, level + 1)
    if (solution)
      return solution
  }
}

function satisfiesConstraints({ clues, board, boardRows, boardColumns, clueI, row, col, direction }) {
  return satisfiesColumnIsUnique(board, col, boardRows) &&
    satisfiesRowIsUnique(board, row, boardColumns) &&
    satisfiesClue(clues[clueI], board, boardRows, boardColumns, row, col, direction)
}

function satisfiesClue(clue, board, boardRows, boardColumns, row, col, direction) {
  if (direction.rowDirection === 0)
    col = 0
  else if (direction.colDirection === 0)
    row = 0

  let maxSkyScraperHeight = 0
  let skyScrapersSeenTillNow = 0
  let hasIndeterminateSkyScrapers = false
  for (; row < boardRows && col < boardColumns; row += direction.rowDirection, col += direction.colDirection) {
    const skyScraperHeight = board[row][col]
    if (skyScraperHeight === 0) {
      hasIndeterminateSkyScrapers = true
      continue
    }

    if (board[row][col] > maxSkyScraperHeight) {
      skyScrapersSeenTillNow++
      if (skyScraperHeight === boardColumns)
        break
      maxSkyScraperHeight = skyScraperHeight
    }
  }

  return hasIndeterminateSkyScrapers
    ? skyScrapersSeenTillNow <= clue
    : skyScrapersSeenTillNow === clue
}

function satisfiesColumnIsUnique(board, col, boardRows) {
  const numberInRow = new Array(boardRows)

  for (let currRow = 0; currRow < boardRows; currRow++) {
    const skyScraper = board[currRow][col]

    if (skyScraper === 0) return true

    if (numberInRow[skyScraper] !== undefined)
      return false

    numberInRow[skyScraper] = true
  }
  return true
}

function lastState({clues, clueI}) {
  return clueI === clues.length
}

function satisfiesRowIsUnique(board, row, boardCols) {
  const numberInCol = new Array(boardCols)

  for (let currCol = 0; currCol < boardCols; currCol++) {
    const skyScraper = board[row][currCol]

    if (skyScraper === 0) return true

    if (numberInCol[skyScraper] !== undefined)
      return false

    numberInCol[skyScraper] = true
  }
  return true
}

function findNextClue(clues, clueI) {
  const nextClueI = clues.slice(clueI).findIndex(clue => !!clue)
  if (nextClueI === -1)
    return clues.length
  else
    return nextClueI + clueI
}

function nextSkyScraperState({ clues, board, clueI, boardRows, boardColumns, row, col, direction }) {
  if (clueI === undefined || isOnTheEdge(row, col, direction, boardRows, boardColumns)) {
    clueI = findNextClue(clues, clueI || 0)
    if (lastState({clues, clueI}))
      return {board, clues, clueI}
    let {initialClueRow, initialClueCol, initialDirection} = determineStartFromClueI(clueI, boardRows, boardColumns)
    row = initialClueRow
    col = initialClueCol
    direction = initialDirection
  }
  else {
    row += direction.rowDirection
    col += direction.colDirection
  }

  return { clues, board, clueI, boardRows, boardColumns, row, col, direction }
}

function determineStartFromClueI(clueI, boardRows, boardColumns) {
  if (clueI < boardRows)
    return {
      initialClueRow: 0,
      initialClueCol: clueI,
      initialDirection: {rowDirection: 1, colDirection: 0}
    }
  else if (clueI < boardRows + boardCols)
    return {
      initialClueRow: clueI - boardCols + 1,
      initialClueCol: boardColumns - 1,
      initialDirection: { rowDirection: 0, colDirection: -1 }
    }
  else if (clueI < boardRows + boardCols + boardRows)
    return {
      initialClueRow: (clueI + boardCols) - 2 * boardRows - 1,
      initialClueCol: boardColumns - 1,
      initialDirection: { rowDirection: -1, colDirection: 0 }
    }
  else
    return {
      initialClueRow: (clueI + boardRows) - 2 * boardRows - boardCols - 1,
      initialClueCol: 0,
      initialDirection: { rowDirection: 0, colDirection: 1 }
    }
}

function isOnTheEdge(row, col, direction, boardRows, boardColumns) {
  return row + direction.rowDirection === boardRows ||
    col + direction.colDirection === boardColumns
}

function incrementSkyScraperState({ clues, clueI, board, boardRows, boardColumns, row, col , direction}) {
  const newBoard = Array.from(board, (oldRow, rowI) => rowI === row ? Array.from(oldRow) : oldRow)
  const skyScraperHeight = newBoard[row][col]

  if (skyScraperHeight === boardColumns)
    return null

  newBoard[row][col]++

  return { clues, clueI, board: newBoard, boardRows, boardColumns, row, col, direction }
}

function indent(level) {
  if (level <= 20)
    return ''.padStart(level, '-')
  else
    return `(${level})` + ''.padStart(20, '-') + ``
}

console.log(solvePuzzle([3, 2, 2, 3, 2, 1,
  1, 2, 3, 3, 2, 2,
  5, 1, 2, 2, 4, 3,
  3, 2, 1, 2, 2, 4]))