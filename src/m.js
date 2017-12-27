const m = {
  getRandomInt: (min = 0, max = 10) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  },
  getRandomArray: (min, max, length) => {
    let array = [];
    if (!length) return array;

    for (let i = 0; i < length; i++) {
      array.push(m.getRandomInt(min, max));
    }
    return array;
  },
  getArraySum: (array) => {
    if (!array) return 0;
    return array.reduce((sum, current) => {
      return sum + current;
    }, 0);
  },
  getVariances: (array) => {
    let sr = (m.getArraySum(array) / (array.length));
    let sum = array.reduce((sum, current) => {
      return sum + (current - sr) * (current - sr);
    }, 0);
    return Math.abs(sum / (array.length - 1));
  },
  getNewArray: (oldArray) => { //TODO придумать нормас название
    const min = Math.min.apply(Math, oldArray);
    const max = Math.max.apply(Math, oldArray);
    const r = max - min;
    const deltaX = r / (1 + 3.22 * Math.log(oldArray.length));

    let array = [];
    oldArray.forEach((item, i) => {
      const val = min + deltaX * i;
      array.push(val);
    });
    // array.push(min + deltaX * oldArray.length);
    return array;
  },
  inInterval: (max, min, value) => {
    return value <= max && value >= min;
  },
  countInInterval: (max, min, array) => {
    return array.reduce((sum, current) => {
      return m.inInterval(max, min, current) ? sum + 1 : sum;
    }, 0);
  },
  awesomeRound: (val) => ((Math.round(val * 1000) / 1000)),
  getAsymmetryCoef: (array) => {
    const var1 = Math.sqrt(m.getVariances(array));
    const sr = (m.getArraySum(array) / (array.length));
    let sum = array.reduce((sum, current) => {
      return sum + (current - sr) * (current - sr) * (current - sr);
    }, 0);
    const val = sum / ((array.length - 1) * var1 * var1 * var1);
    return m.awesomeRound(val);
  },
  getExcess: (array) => {
    const var1 = m.getVariances(array);
    const sr = (m.getArraySum(array) / (array.length));
    let sum = array.reduce((sum, current) => {
      return sum + (current - sr) * (current - sr) * (current - sr) * (current - sr);
    }, 0);
    const val = sum / ((array.length - 1) * var1 * var1);
    return m.awesomeRound(val - 3);
  },
  getHitArray: (array) => {
    let sr = (m.getArraySum(array) / (array.length));
    const var1 = Math.sqrt(m.getVariances(array));
    const newArray = [];
    array.forEach((item, i) => {
      if (i === array.length - 1) return;
      newArray.push(m.laplasFunc(array[i + 1], sr, var1) - m.laplasFunc(item, sr, var1));
    });
    return newArray;
  },
  laplasFunc: (val, sr, var1) => {
    return m.awesomeRound((val - sr) / var1);
  }
};

export default m;