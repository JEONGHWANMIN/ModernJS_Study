const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

Object.prototype.hwans = function () {
  return `I'm Hwans`;
};

console.log(Object.keys(hwanMin));
console.log(Object.values(hwanMin));
console.log(Object.entries(hwanMin));

for (let [key, value] of Object.entries(hwanMin)) {
  console.log(key, value);
}
