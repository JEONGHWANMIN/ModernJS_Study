const hwanMin = {
  name: 'HwanMin',
  printName: function () {
    setTimeout(function () {
      console.log(this);
    });
  },

  printName2: function () {
    setTimeout(() => {
      console.log(this);
    });
  },
};

hwanMin.printName();
hwanMin.printName2();
