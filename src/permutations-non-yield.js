function permutation(arr, cb, from = 0) {
  const length = arr.length

  if (from === length) {
    cb(arr)
    return
  }
  for (let i = from; i < length; ++i) {
    swap(arr, from, i)

    permutation(arr, cb, from + 1)

    swap(arr, from, i)
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
// let i = 0
// for (const perm of permutation(range(1, 11)))
//   if (i++ % 100000 === 0) console.log(JSON.stringify(perm));

let i = 0

permutation(range(1, 11), _ => ++i)

console.log(i)