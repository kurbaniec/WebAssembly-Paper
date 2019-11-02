
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
    /**
    worker1 = new Worker('worker.js');
    worker1.postMessage(location.href + "/resources/hamlet_0.txt");
    worker1.addEventListener('message', function(e) {
        hamlet[1] = e.data;
        finished++;
        if(finished === 3) done();
    }, false);

    worker2 = new Worker('worker.js');
    worker2.postMessage(location.href + "/resources/hamlet_1.txt");
    worker2.addEventListener('message', function(e) {
        hamlet[2] = e.data;
        finished++;
        if(finished === 3) done();
    }, false);

    worker3 = new Worker('worker.js');
    worker3.postMessage(location.href + "/resources/hamlet_2.txt");
    worker3.addEventListener('message', function(e) {
        hamlet[3] = e.data;
        finished++;
        if(finished === 3) done();
    }, false);*/

};

const done = () => {
    for(worker of workers) {
        worker.terminate();
    }
    /**
    worker1.terminate();
    worker2.terminate();
    worker3.terminate();*/
    let text = hamlet.join("");
    result.innerText = (performance.now() - start) + " ms";
    output.innerText = text;
};

button.addEventListener("click", event => {
    test();
});