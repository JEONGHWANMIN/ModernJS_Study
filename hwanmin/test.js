function convertListToObject(arr) {
  // TODO: 여기에 코드를 작성합니다.
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 0) continue;
    if (Object.keys(obj).includes(arr[i][0])) continue;
    obj[arr[i][0]] = arr[i][1];
  }
  return obj;
}
const arr = [
  ['make', 'Ford'],
  ['model', 'Mustang'],
  ['year', '1964'],
  ['make', 'Bill'],
];

let output = convertListToObject(arr);

console.log(output); // -->
// {
//   make : 'Ford'
//   model : 'Mustang',
//   year : '1964'
// }
