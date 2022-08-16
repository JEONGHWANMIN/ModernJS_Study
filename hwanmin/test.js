const target = "abc#123";
target.replace(/[^A-Za-z0-9]/gi, "");
console.log(
  'target.replace(/[^A-Za-z0-9]/gi, ""): ',
  target.replace(/[^A-Za-z0-9]/gi, "")
);
