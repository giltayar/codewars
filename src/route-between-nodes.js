const nodeE = { value: 'e', children: []}
const nodeD = { value: 'd', children: [nodeE] }
const nodeB = { value: 'b', children: [nodeD] }
const nodeC = { value: 'c', children: [nodeE] }
const nodeA = {value: 'a', children: [nodeB, nodeC]}
const nodeF = {value: 'f', children: [nodeD]}

nodeD.children.push(nodeA)

const graph = [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF]

function isThereAPath(graph, sourceNode, targetNode) {
  const visited = new Set()
  const queue = []

  queue.push(sourceNode)

  while (queue.length) {
    const current = queue.pop()
    if (visited.has(current))
      continue
    visited.add(current)
    if (current === targetNode)
      return true

    queue.push(...current.children)
  }
  return false
}

console.log(isThereAPath(graph, nodeA, nodeF))
console.log(isThereAPath(graph, nodeB, nodeA))
