function peacefulYard(yard, minDistance) {
    const cats = findCats(yard);

    for (const cat1 of cats)
      for (const cat2 of cats)
        if (cat1 !== cat2 && distance(cat1, cat2) < minDistance)
          return false
    return true
}

function findCats(yard) {
  const cats = []

  for (const y in yard)
    for (const x in yard[y])
      if (yard[y][x] !== '-')
        cats.push([x, y])

  return cats;
 }

 function distance([x1, y1], [x2, y2]) {
   return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
 }


console.log(peacefulYard(["------------", "---M--------", "------------", "------------", "-------R----", "------------"], 6))
