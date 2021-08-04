function surfaceArea(A) {
  const flatArray = A.reduce((a, c) => a.concat(c), [])

  const buildHeight = Math.max(...flatArray)
  const columnsNum = flatArray.length

  let area = 0

  // MAIN CODE:
  for (let floor = buildHeight; floor > 0; floor--) {
    const currentFloorArea = findCurrentFloorArea(floor)
    area += currentFloorArea
  }

  area += columnsNum * 2

  // METHODS:
  function findCurrentFloorArea(floor) {
    const currentFloorMap = createCurrentFloorMap(floor)
    const currentFloorSurfaceMap = createSurfaceMap(currentFloorMap)
    const sumOfFloorWalls = currentFloorSurfaceMap.reduce((acc, curr) => {
      return acc + curr.reduce((a, c) => a += c, 0)
    }, 0)

    //console.log("4 = room, 0 = empty space")
    //console.log(currentFloorMap)
    //console.log("4,3,2,1,0 = number of outside walls")
    //console.log(currentFloorSurfaceMap)
    //console.log(sumOfFloorWalls)

    return sumOfFloorWalls
  }

  function createCurrentFloorMap(floor) {
    let map = []
    map = A.map(a => {
      return a.map((n) => n >= floor ? 4 : 0)
    })
    return map
  }

  function createSurfaceMap(floorMap) {
    const outsideWallsMap = floorMap.map(a => {
      return a.map(r => r)
    })

    for (let i = 0; i < floorMap.length; i++) {
      for (let j = 0; j < floorMap[0].length; j++) {
        if (floorMap[i][j] && floorMap[i][j + 1] > 0) outsideWallsMap[i][j]--
        if (floorMap[i][j] && floorMap[i][j - 1] > 0) outsideWallsMap[i][j]--
        if (floorMap[i][j] && floorMap[i + 1] && floorMap[i + 1][j] > 0) outsideWallsMap[i][j]--
        if (floorMap[i][j] && floorMap[i - 1] && floorMap[i - 1][j] > 0) outsideWallsMap[i][j]--
      }

    }
    return outsideWallsMap

  }
  return area
}

const array = [
  [10]
]
//const array = [[15],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]]
//const array = [[3,7,1],
//              [3,2,6],
//             [1,5,6]]
//const array = [[3,3,3,3,3,3,3,3,3,3],
//               [3,3,3,3,3,3,3,3,3,3],
//               [3,3,3,3,3,3,3,3,3,3]]
//const array = [[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9],[9]]
//const array = [[1,2,3,4,5,6,7,8,9],
//               [9,8,7,6,5,4,3,2,1],
//               [1,2,3,4,5,6,7,8,9],
//               [9,8,7,6,5,4,3,2,1],]
//const array = [[1,9,1,9,1,9,1],
//              [9,1,9,1,9,1,9],
//              [1,9,1,9,1,9,1],
//              [9,1,9,1,9,1,9]]
surfaceArea(array)
