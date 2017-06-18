console.log(parenthesisPermutations(4))

function parenthesisPermutations1(n) {
  if (n === 1)
    return ['()']

  const ret = []

  const smallerPerms = parenthesisPermutations1(n - 1)

  ret.push(...(smallerPerms.map(perm => '()' + perm)))
  ret.push(...(smallerPerms.map(perm => perm + '()')))
  ret.push(...(smallerPerms.map(perm => `(${perm})`)))

  return ret
}

function parenthesisPermutations(n) {
  return Array.from(new Set(parenthesisPermutations1(n)))
}