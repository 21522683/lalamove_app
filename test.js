const a = [1, 2, 3];

// for (let i = 0; i < a.length; i++) a[i] += 3;
a.forEach(item => {
  item = item + 3;
});

console.log(a);
