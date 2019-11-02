
const button = document.getElementById("start");
const result = document.getElementById("result");
const output = document.getElementById("output");
let hamlet = [];
let start;
let workers = [];

const test = () => {
    let finished = 0;
    start = performance.now();
    workers = [new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js')];

    for(let i = 0; i < workers.length; i++) {
        workers[i].postMessage(location.href + "/resources/hamlet_" + i + ".txt");
        workers[i].addEventListener('message', function(e) {
            hamlet[i] = e.data;
            finished++;
            if(finished === 3) done();
        }, false);
    }
};

const done = () => {
    for(worker of workers) {
        worker.terminate();
    }
    let text = hamlet.join("");
    result.innerText = (performance.now() - start) + " ms";
    output.innerText = text;
};

button.addEventListener("click", event => {
    test();
});