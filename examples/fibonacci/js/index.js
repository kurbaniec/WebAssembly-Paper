import * as fib from "./fib"

const button = document.getElementById("start");
const result = document.getElementById("result");

const getAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
const getMin = arr => Math.min(...arr);
const getMax = arr => Math.max(...arr);

const test = () => {
    let times = [];
    for(let i = 0; i < 10; i++) {
        const start = window.performance.now();
        const result = fib.fibonacci(30);
        const end = window.performance.now();
        times.push(end-start);
    }
    const avg = getAvg(times);
    const min = getMin(times);
    const max = getMax(times);
    result.innerHTML = "Benchmark done. Results:<br/>" +
        "  Avg: " + avg + " ms<br/>" +
        "  Min: " + min + " ms<br/>" +
        "  Max: " + max + " ms<br/>";
};

button.addEventListener("click", event => {
    test();
});