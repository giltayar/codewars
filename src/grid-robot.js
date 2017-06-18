
const ser = JSON.stringify

function path(width, height, obstacles, start, end) {
  const queue = [start]
  const prev = new Map()
  const dist = new Map([[ser(start), 0]])

  while (queue.length) {
    const currPosition = queue.pop()
    const currPositionDist = dist.get(ser(currPosition))
    const neighbors = determinNeighbors(width, height, obstacles, currPosition)

    for (const neighbor of neighbors) {
      const neighborDist = dist.get(ser(neighbor))
      if (neighborDist === undefined || neighborDist > currPositionDist + 1) {
        dist.set(ser(neighbor), currPositionDist + 1)

        prev.set(ser(neighbor), currPosition)
        if (ser(neighbor) === ser(end))
          break
        queue.push(neighbor)
      }
    }
  }
  const retReversed = []
  let curr = end

  while (curr != undefined && ser(curr) !== ser(start)) {
    retReversed.push(curr)
    curr = prev.get(ser(curr))
  }
  if (ser(curr) !== ser(start))
    return undefined

  retReversed.push(start)
  return reverse(retReversed)
}

function determinNeighbors(width, height, obstacles, currPosition) {
  const ret = []
  if (currPosition[1] > 0) {
    const newPosition = [currPosition[0], currPosition[1] - 1]
    if (!obstacles.has(ser(newPosition)))
      ret.push(newPosition)
  }
  if (currPosition[1] < height - 1) {
    const newPosition = [currPosition[0], currPosition[1] + 1]
    if (!obstacles.has(ser(newPosition)))
      ret.push(newPosition)
  }
  if (currPosition[0] > 0) {
    const newPosition = [currPosition[0] - 1, currPosition[1]]
    if (!obstacles.has(ser(newPosition)))
      ret.push(newPosition)
  }
  if (currPosition[0] < width - 1) {
    const newPosition = [currPosition[0] + 1, currPosition[1]]
    if (!obstacles.has(ser(newPosition)))
      ret.push(newPosition)
  }

  return ret
}

function reverse(array) {
  if (array.length === 1)
    return array

  return [].concat(reverse(array.slice(1)), [array[0]])
}

/*
*X****
*X****
*X*X**
***X**
XXXX**
******
*/
console.log(path(6, 6, new Set([
  ser([1, 0]),
  ser([1, 1]),
  ser([1, 2]),
  ser([0, 4]),
  ser([1, 4]),
  ser([2, 4]),
  ser([3, 4]),
  ser([3, 3]),
  ser([3, 2]),
  ]), [0, 0], [5, 5]))
