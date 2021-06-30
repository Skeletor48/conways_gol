const table = document.getElementById('life-canvas')

function draw() {
  let cellId = 1
    for (let i = 0; i < 124; i++) {
      let row = document.createElement('tr')
      table.append(row)
      for (let j = 0; j < 124; j++) {
        let cell = document.createElement('td')
        cell.setAttribute('id', `id-${i}-${j}`)
        cell.className = 'dead'
        cell.addEventListener("click", changeState)
        row.append(cell)
      }
    }
}

function changeState(e) {
  const state = e.target.className
  const newState = state === 'dead' ? 'alive' : 'dead'
  e.target.className = newState
  console.log(e.target.id)

}
