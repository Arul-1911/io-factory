document.getElementById("calculate").addEventListener("click", function () {
  const input = document.getElementById("heights").value;
  const heights = input.split(",").map(Number);

  if (heights.some(isNaN)) {
    alert("Enter a valid input: only comma-separated numbers are allowed");
    return;
  }

  const waterUnits = calculateWater(heights);
  document.getElementById(
    "output"
  ).innerText = `Output: ${waterUnits} Units of Water`;

  visualizeWater(heights);
});

function calculateWater(heights) {
  let leftMax = Array(heights.length).fill(0);
  let rightMax = Array(heights.length).fill(0);

  for (let i = 1; i < heights.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
  }

  for (let i = heights.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
  }

  let waterUnits = 0;
  for (let i = 0; i < heights.length; i++) {
    const waterAtCurrent = Math.min(leftMax[i], rightMax[i]) - heights[i];
    if (waterAtCurrent > 0) {
      waterUnits += waterAtCurrent;
    }
  }

  return waterUnits;
}

function visualizeWater(heights) {
  const table = document.getElementById("water-visualization");
  table.innerHTML = "";

  let leftMax = Array(heights.length).fill(0);
  let rightMax = Array(heights.length).fill(0);

  for (let i = 1; i < heights.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
  }
  for (let i = heights.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
  }

  const maxHeight = Math.max(...heights, ...leftMax, ...rightMax);

  for (let row = maxHeight; row > 0; row--) {
    const tr = document.createElement("tr");

    heights.forEach((height, index) => {
      const td = document.createElement("td");
      td.classList.add("cell");

      if (height >= row) {
        td.classList.add("building");
      } else if (row <= Math.min(leftMax[index], rightMax[index])) {
        td.classList.add("water");
      }

      tr.appendChild(td);
    });

    table.appendChild(tr);
  }
}
