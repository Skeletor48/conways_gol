const table = document.getElementById('life-canvas')
const cellMatrix = []

function draw() {
    for (let i = 0; i < 124; i++) {
      let row = document.createElement('tr')
      table.append(row)
      let matrixRow = []

      for (let j = 0; j < 124; j++) {
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
  // setNextGeneration()
}

function setNextGeneration() {
  cellMatrix.forEach((matrixRow) => {
    matrixRow.forEach((cell) => {
      const neighboursState = checkNeighboursState(cell)
      // This is just a test check not the real rules
      if(neighboursState.aliveCellCounter > neighboursState.deadCellCounter){
        killCell(cell)
      }else if(neighboursState.aliveCellCounter < neighboursState.deadCellCounter){
        resurrectCell(cell)
      }
    });
  });
}

function killCell(cell) {
  return cell.className = 'dead'
}

function resurrectCell(cell) {
  return cell.className = 'alive'
}

function checkNeighboursState(cell) {
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

  let aliveCellCounter = 0
  let deadCellCounter = 0

  neighbours.forEach((neighbour) => {
    let state = ''
    // TODO: This check is not correct and also not readable
    if(x-1 >= 0 && y-1 >= 0 && x+1 <= 123 && y+1 <= 123) {
      state = cellMatrix[neighbour.x][neighbour.y]?.className
    }

    if (state === 'dead'){
      deadCellCounter++
    } else if (state === 'alive') {
      aliveCellCounter++
    }
  });

return {aliveCellCounter,deadCellCounter}
}

function getCoordinates(cell) {
  return cell.id.split('-').splice(1)
}
