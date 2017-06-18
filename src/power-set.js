const set = [4, 5, 6]

function powerSet(set) {
  const ret = [set]

  if (set.length <= 1)
    return ret;

  for (const i in set) {
    const subset = [...set]
    subset.splice(i, 1)

    ret.push(...powerSet(subset))
  }

  return ret
}

console.log(powerSet(set))