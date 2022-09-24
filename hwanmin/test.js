async function bar(n) {
  const a = await new Promise((resolve) => setTimeout(() => resolve(n), 3000));

  const b = await new Promise((resolve) =>
    setTimeout(() => resolve(a + 1), 2000)
  );

  const c = await new Promise((resolve) =>
    setTimeout(() => resolve(b + 1), 1000)
  );

  console.log([a, b, c]);
}

bar(1);
