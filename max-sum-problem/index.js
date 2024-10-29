const time_unit = [4, 5, 10];
let allSolutions = [];
let maxEarnings = 0;

function calculateEarnings() {
  const n = parseInt(document.getElementById("timeUnit").value);
  allSolutions = [];
  maxEarnings = 0;
  find(n, [0, 0, 0], 0);

  document.getElementById("result").innerHTML = `
        <h2>Earnings: $${maxEarnings}</h2>
        <p>Possible Solutions:</p>  
       <h3> <pre>${allSolutions.map((sol) => sol).join("\n")}</pre></h3>
    `;
}

function find(n, counts, currentEarnings) {
  if (n < 4) {
    return;
  }
  for (let i = 0; i < time_unit.length; i++) {
    if (n >= time_unit[i]) {
      const earnings =
        currentEarnings +
        (n - time_unit[i]) *
          (1000 * (i === 0) + 1500 * (i === 1) + 3000 * (i === 2));
      counts[i]++;

      if (earnings > maxEarnings) {
        maxEarnings = earnings;
        allSolutions = [];
      }

      if (earnings === maxEarnings) {
        allSolutions.push(`T: ${counts[1]}, P: ${counts[0]}, C: ${counts[2]}`);
      }
      find(n - time_unit[i], counts.slice(), earnings);
      counts[i]--;
    }
  }
}
