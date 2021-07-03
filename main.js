const table = document.getElementById('life-canvas')
const cellMatrix = []
let simulation;

function draw() {
    for (let i = 0; i < 27; i++) {
      let row = document.createElement('tr')
      table.append(row)
      let matrixRow = []

      for (let j = 0; j < 27; j++) {
        let cell = document.createElement('td')
        cell.setAttribute('id', `id-${i}-${j}`)
        cell.className = 'dead'
        cell.addEventListener("click", switchCell)
        row.append(cell)
        matrixRow.push(cell)
      }
      cellMatrix.push(matrixRow)
    }
}

function switchCell(e) {
  const state = e.target.className
  const newState = state === 'dead' ? 'alive' : 'dead'
  e.target.className = newState
}

function simulateLife() {
  simulation = setInterval(setNextGeneration,500)
}

function stopSimulation() {
  clearInterval(simulation)
}

function setNextGeneration() {
  const cellsToKill=[]
  const cellsToResurrect=[]
  cellMatrix.forEach((matrixRow) => {
    matrixRow.forEach((cell) => {
      const aliveNeighboursCount = countAliveNeighbours(cell)

      const isAliveInNextGeneration = cell.className === 'dead' && aliveNeighboursCount === 3
      const isDeadInNextGeneration = cell.className === 'alive' && ![2,3].includes(aliveNeighboursCount)
      if(isDeadInNextGeneration){
        cellsToKill.push(cell)
      }else if(isAliveInNextGeneration){
        cellsToResurrect.push(cell)
      }
    });
  });
  killCells(cellsToKill)
  resurrectCells(cellsToResurrect)
}

function killCells(cells) {
  cells.forEach((cell) => {
    cell.className = 'dead'
  });
}

function resurrectCells(cells) {
  cells.forEach((cell) => {
    cell.className = 'alive'
  });
}

function countAliveNeighbours(cell) {
  const coordinates = getCoordinates(cell)
  const x = Number(coordinates[0])
  const y = Number(coordinates[1])

  const neighbours = [
    {x:x,y:y-1},
    {x:x,y:y+1},
    {x:x-1,y:y-1},
    {x:x-1,y:y},
    {x:x-1,y:y+1},
    {x:x+1,y:y-1},
    {x:x+1,y:y},
    {x:x+1,y:y+1},
  ]

  let aliveNeighboursCounter = 0

  neighbours.forEach((neighbour) => {
    let state = ''
    // TODO: This check is not correct and also not readable
    if(x-1 >= 0 && y-1 >= 0 && x+1 <= 26 && y+1 <= 26) {
      state = cellMatrix[neighbour.x][neighbour.y]?.className
    }

    if (state === 'alive'){
      aliveNeighboursCounter++
    }
  });

return aliveNeighboursCounter
}

function getCoordinates(cell) {
  return cell.id.split('-').splice(1)
}
