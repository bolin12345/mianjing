var counter = {
  count: 0,
  inc: () => {
    this.count++;
  },
  test: function () {
    const i = () => {
      return this.count;
    };
    console.log(i());
  },
};
counter.test();
