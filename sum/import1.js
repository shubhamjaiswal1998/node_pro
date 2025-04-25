const fact = (n) => {
  let f = 1;
  for (let i = 1; i <= n; i++) {
    f = f * i;
  }
  return f;
};
const sum_of_digit = (n) => {
  let s = 0;
  while (n != 0) {
    let r = n % 10;
    s = s + r;
    n = parseInt(n / 10);
  }
  return s;
};
let var1;
module.exports = { fact, sum_of_digit, var1 };
