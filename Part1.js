function calculateExp(expression) {
  expression = expression.replace(/\s+/g, "");
  let myArr = expression.split("");
  let values = [];
  let ops = [];

  for (let i = 0; i < myArr.length; i++) {
    if (myArr[i] >= "0" && myArr[i] <= "9") {
      let sbuf = "";
      while (i < myArr.length && myArr[i] >= "0" && myArr[i] <= "9") {
        sbuf = sbuf + myArr[i++];
      }
      values.push(parseInt(sbuf, 10));
      i--;
    } else if (myArr[i] == "(") {
      ops.push(myArr[i]);
    } else if (myArr[i] == ")") {
      while (ops[ops.length - 1] != "(") {
        values.push(calculateOperator(ops.pop(), values.pop(), values.pop()));
      }
      ops.pop();
    } else if (
      myArr[i] == "+" ||
      myArr[i] == "-" ||
      myArr[i] == "*" ||
      myArr[i] == "/"
    ) {
      while (ops.length > 0 && isPriority(myArr[i], ops[ops.length - 1])) {
        values.push(calculateOperator(ops.pop(), values.pop(), values.pop()));
      }
      ops.push(myArr[i]);
    }
  }
  while (ops.length > 0) {
    values.push(calculateOperator(ops.pop(), values.pop(), values.pop()));
  }
  return values.pop();
}

function isPriority(op1, op2) {
  if (op2 == "(" || op2 == ")") {
    return false;
  }
  if ((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) {
    return false;
  } else {
    return true;
  }
}

function calculateOperator(op, b, a) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b == 0) {
        console.log("Cannot divide by zero");
      }
      return a / b;
  }
  return 0;
}

console.log(calculateExp("((5 + 8) * 3) / 8 + 3"));
console.log(calculateExp("8 + 9 + 3 * 6"));
