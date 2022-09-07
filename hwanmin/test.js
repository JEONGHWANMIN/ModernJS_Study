const 프로미스 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 3000);
});

프로미스
  .finally(() => console.log("시작~"))
  .catch((err) => console.log(err))
  .then((res) => res + 1)
  .then((res) => res + 1)
  .then((res) => {
    res + 1;
    console.log(res + 1);
    return res + 1;
  })
  .finally(() => console.log("끝~"))
  .finally(() => console.log("진짜 끝이지롱"));
