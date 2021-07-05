const table = document.getElementById('life-canvas')
const gridToggle = document.getElementById('grid-toggle')
let rowSize = 128;
const cellMatrix = []
let simulation;
let generationCounter = 0;

function draw() {
  // gridToggle.className = 'off'
  for (let i = 0; i <= rowSize; i++) {
    let row = document.createElement('tr')
    table.append(row)
    let matrixRow = []

    for (let j = 0; j <= rowSize; j++) {
      let cell = document.createElement('td')
      cell.setAttribute('id', `id-${i}-${j}`)
      cell.className = 'dead'
      cell.addEventListener("click", switchCellOnClick)
      row.append(cell)
      matrixRow.push(cell)
    }
    cellMatrix.push(matrixRow)
  }
}

function switchCellOnClick(e) {
  const state = e.target.className
  const newState = state === 'dead' ? 'alive' : 'dead'
  e.target.className = newState
}

function simulateLife() {
  simulation = setInterval(setNextGeneration, 400)
}

function stopSimulation() {
  clearInterval(simulation)
}

function clearTable() {
  cellMatrix.forEach((matrixRow) => {
    matrixRow.forEach((cell) => {
      cell.className = 'dead'
    })
  })
  stopSimulation()
  generationCounter = 0;
  setGenerationCounterElement()
}

function setGenerationCounterElement() {
  document.getElementById('generation-counter').textContent = `Generation: #${generationCounter}`
}

function setNextGeneration() {
  const cellsToChange = []
  cellMatrix.forEach((matrixRow) => {
    matrixRow.forEach((cell) => {
      const aliveNeighboursCount = countAliveNeighbours(cell)

      const isAliveInNextGeneration = cell.className === 'dead' && aliveNeighboursCount === 3
      const isDeadInNextGeneration = cell.className === 'alive' && ![2, 3].includes(aliveNeighboursCount)

      if (isDeadInNextGeneration || isAliveInNextGeneration) {
        cellsToChange.push(cell)
      }
    })
  })
  changeCellStates(cellsToChange)
  generationCounter++
  setGenerationCounterElement()
}

function changeCellStates(cells) {
  cells.forEach((cell) => {
    cell.className = cell.className === 'dead' ? 'alive' : 'dead'
  })
}

function countAliveNeighbours(cell) {
  const coordinates = getCoordinates(cell)
  const x = Number(coordinates[0])
  const y = Number(coordinates[1])
  let aliveNeighboursCounter = 0

  /*
  Every cell has 8 neighbours, expect on the edges.
  Since this is a 2D array it is pretty east
  to check the neighbours by x,y coordinates.

    o o o
    o x o
    o o o

  */

  const neighbours = [{
      x: x,
      y: y - 1
    },
    {
      x: x,
      y: y + 1
    },
    {
      x: x - 1,
      y: y - 1
    },
    {
      x: x - 1,
      y: y
    },
    {
      x: x - 1,
      y: y + 1
    },
    {
      x: x + 1,
      y: y - 1
    },
    {
      x: x + 1,
      y: y
    },
    {
      x: x + 1,
      y: y + 1
    },
  ]

  neighbours.forEach((neighbour) => {
    let state = ''
    const neighbourIsOnGrid = neighbour.x > 0 && neighbour.y > 0 && neighbour.x < rowSize && neighbour.y < rowSize
    if (neighbourIsOnGrid) {
      state = cellMatrix[neighbour.x][neighbour.y]?.className
    }

    if (state === 'alive') {
      aliveNeighboursCounter++
    }
  })
  return aliveNeighboursCounter
}

function getCoordinates(cell) {
  return cell.id.split('-').splice(1)
}

function toggleGrid() {
  cellMatrix.forEach((matrixRow) => {
    matrixRow.forEach((cell) => {
      cell.style.border = gridToggle.className === 'fas fa-th fa-lg on' ? '0.5px solid black' : '0.5px solid #2f2c2c'
    })
  })
  gridToggle.className = gridToggle.className === 'fas fa-th fa-lg on' ? 'fas fa-th fa-lg off' : 'fas fa-th fa-lg on'
}
