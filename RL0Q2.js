const fs = require("fs");

fs.readFile("L0Q2.in", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  let array = input
    .replaceAll("(", "[")
    .replaceAll(")", "]")
    .split("\n")
    .map((line) => line.split(" "));

  let origem = [0, 0];
  let output = "";

  array.map((line) => {
    let integerArray = [];
    let stringArray = [];
    let decimalArray = [];
    let pointsArray = [];

    line.forEach((elementos) => {
      if (!isNaN(elementos)) {
        Number.isInteger(+elementos)
          ? integerArray.push(+elementos)
          : decimalArray.push(+elementos);

        return;
      }

      if (!elementos.includes("[")) {
        stringArray.push(elementos);
        return;
      }

      pointsArray.push(JSON.parse(elementos));
    });

    let formatarLinha = "str:";
    insertionSort(stringArray).forEach((el) => (formatarLinha += `${el} `));

    formatarLinha += "int:";
    insertionSort(integerArray).forEach((el) => (formatarLinha += `${el} `));

    formatarLinha += "float:";
    insertionSort(decimalArray).forEach((el) => (formatarLinha += `${el} `));

    let pointsToSort = {};
    pointsArray.forEach((point) => {
      const distance = calculateDistance(point, origem);
      pointsToSort = { ...pointsToSort, [point]: distance };
    });
    formatarLinha += `p:${sortPoints(pointsToSort)}`;
    
    output += formatarLinha.trim().concat('\n')
  });

  createOutputFile(output.substring(0, output.length - 1));
});

const calculateDistance = (A, B) => {
  const { sqrt, pow } = Math;
  return sqrt(pow(A[0] - B[0], 2) + pow(A[1] - B[1], 2));
};

const sortPoints = (points) => {
  let formatedPoints = "";
  let sortedValues = insertionSort(Object.values(points));
  let pointsArray = Object.entries(points)

  sortedValues.forEach((value) => {
    pointsArray.filter((el) => {
      if (el[1] === value) {
        formatedPoints += `(${el[0]}) `
        return
      };

      return el
    });
  });

  return formatedPoints;
};

const createOutputFile = (output) => {
  fs.writeFile("L0Q2.out", output, (err) => {
    if (err) throw err;

    console.log("Arquivo criado!");
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
