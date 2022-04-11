const fs = require("fs");

fs.readFile("L0Q1.in", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  let array = input
    .replaceAll("points ", "")
    .replaceAll("(", "[")
    .replaceAll(")", "]")
    .replaceAll(" ", ",")
    .split("\n")
    .map((elementos) => eval("[" + elementos + "]"));

  const origin = [0, 0];
  let output = "";

  array.map((line) => {
    let totalLineDistance = 0;
    let shortcut = 0;
    let lineToSort = {};

    line.map((point, index) => {
      const distance = calculateDistance(point, origin);

      if (index < line.length - 1)
        totalLineDistance += calculateDistance(line[index], line[index + 1]);

      lineToSort = { ...lineToSort, [point.toString()]: distance };
    });

    shortcut = calculateDistance(line[0], line[line.length - 1]);
    const sortedLine = sortLine(lineToSort);

    output += sortedLine.concat(
      ` distance ${totalLineDistance.toFixed(2)} shortcut ${shortcut.toFixed(
        2
      )}\n`
    );
  });

  createOutputFile(output.substring(0, output.length - 1));
});

const calculateDistance = (A, B) => {
  const { sqrt, pow } = Math;
  return sqrt(pow(A[0] - B[0], 2) + pow(A[1] - B[1], 2));
};

const sortLine = (line) => {
  let formatedLine = "points";
  let sortedValues = insertionSort(Object.values(line));
  let pointsArray = Object.entries(line)

  sortedValues.forEach((value) => {
    pointsArray.filter((el) => {
      if (el[1] === value) {
        formatedLine += ` (${el[0]})`
        return
      };

      return el
    });
  });

  return formatedLine;
};

const createOutputFile = (output) => {
  fs.writeFile("L0Q1.out", output, (err) => {
    if (err) throw err;

    console.log("Arquivo criando!");
  });
};

const insertionSort = (array) => {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let current = array[i];
    let j = i - 1;
    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
};
