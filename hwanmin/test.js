const Promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("실패");
  }, 3000);

  setTimeout(() => {
    resolve("성공");
  }, 2500);
});

Promise2.then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("나는 파이널!"));
