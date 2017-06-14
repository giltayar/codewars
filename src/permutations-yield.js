function* permutation(arr, from = 0) {
  const length = arr.length
  if (from === length) {;    yield arr

    return
  }
  for (let i = from; i < length; ++i) {
    swap(arr, from, i)

    yield* permutation(arr, from + 1)
  }
}

function swap(arr, i, j) {
  if (i === j)
    return

  const tmp = arr[i]

  arr[i] = arr[j]
  arr[j] = tmp
}

function range(from, to) {
  const ret = new Array(to - from)

  for (let i = from; i < to; ++i)
    ret[i - from] = i

  return ret
}

let i = 0
for (const x of permutation(range(1, 11)))
  ++i
console.log(i)
