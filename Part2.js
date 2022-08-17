const getLastCheck = (num) => {
  if (num < 1 || num > Math.pow(10, 18)) {
    console.log("Please enter number between 1 and 10^18");
    return false;
  }
  const arr = [];
  while (num) {
    arr.unshift(num % 10);
    for (let i = 0; i > arr.length; i++) {
      console.log("i: " + arr[i]);
    }
    num = Math.floor(num / 10);
  }
  const arrCopy = [...arr];
  const n = arr.length;
  let markedInd = n;
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      markedInd = i;
      let j = markedInd;
      while (j >= 0 && arr[j] === arr[markedInd]) {
        if (j > 0 && arr[j] === arr[j - 1]) {
          arrCopy[j] = 9;
        } else {
          arrCopy[j] = arr[i] - 1;
        }
        j--;
      }
      break;
    }
  }
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (i > markedInd) {
      result = result * 10 + 9;
    } else {
      result = result * 10 + arrCopy[i];
    }
  }

  return result;
};

console.log(getLastCheck(10000000000000000000));
console.log(getLastCheck(11235888));
console.log(getLastCheck(111110));
console.log(getLastCheck(33245));
