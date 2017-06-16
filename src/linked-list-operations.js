const list = {head: 'a', tail: {head: 'b', tail: {head: 'c', tail: {head: 'b  ', tail: {head: 'a'}}}}}

console.log(isPalindrome(list))
console.log(doesIntersect(list, list))

function isPalindrome(list) {
  return isEqual(reverse(list), list)
}

function reverse(list) {
  let res = undefined
  let curr = list

  while (curr) {
    res = {head: curr.head, tail: res}
    curr = curr.tail
  }

  return res
}

function doesIntersect(l, r) {
  const lItems = new Set((function* () { while (l) { yield l; l = l.tail } })())
  while (r) {
    if (lItems.has(r))
      return true
    r = r.tail
  }
  return false
}

function isEqual(l, r) {
  while (l) {
    if (!r)
      return false

    if (l.head !== r.head)
      return false

    l = l.tail
    r = r.tail
  }
  return true
}

