function hanoi(s1, s2, s3, n = s1.length) {
  if (n === 0)
    return

  hanoi(s1, s3, s2, n - 1)

  s3.push(s1.pop())
  console.log(s1, s2, s3)

  hanoi(s2, s1, s3, n - 1)
}

hanoi([1, 2, 3, 4], [], [])