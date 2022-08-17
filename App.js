function calculate(expression) {
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

const findY = (equation, x) => {
  const expression = equation.replace("x", x);
  return calculate(expression);
};

const main = () => {
  const equation = prompt("Please enter your function:");
  const x1 = 0;
  const x2 = 300;
  const y1 = findY(equation, x1);
  const y2 = findY(equation, x2);
  draw(x1, y1, x2, y2);
};

const draw = (x1, y1, x2, y2) => {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  // set line stroke and line width
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;

  // Draw function with red line
  ctx.translate(500, 0);
  ctx.scale(-1, 1);
  ctx.rotate((180 * Math.PI) / 180);
  ctx.translate(0, -500);

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Draw Ox, Ox with blue line
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 500);
  ctx.moveTo(0, 0);
  ctx.lineTo(500, 0);
  ctx.stroke();
};

main();
