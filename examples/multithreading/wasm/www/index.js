
/**
function sayHI() {
    worker.postMessage({'cmd': 'start', 'msg': 'Hi'});
}

function unknownCmd() {
    worker.postMessage({'cmd': 'foobard', 'msg': '???'});
}

function stop() {
    // Calling worker.terminate() from this script would also stop the worker.
    worker.postMessage({'cmd': 'stop', 'msg': 'Bye'});
}

var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    let result = e.data;
    if(result === "initialized") {
        sayHI();
    }
    else {
        document.getElementById('result').textContent = e.data;
    }
}, false);

document.getElementById("hi").addEventListener('click', sayHI);
document.getElementById("unknown").addEventListener('click', unknownCmd);
document.getElementById("stop").addEventListener('click', stop);*/

const button = document.getElementById("start");
const result = document.getElementById("result");
const output = document.getElementById("output");
let hamlet = [];
let start;
let loadCounter = 0;
let loaded = false;
let finished = 0;
//let workers = [];

let workers = [new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js')];
for (let i = 0; i < workers.length; i++) {
    workers[i].addEventListener('message', loader, false);
}

function loader (e) {
    if (e.data === "WasmLoaded") {
        loadCounter++;
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const load = async () => {
        while (loadCounter !== 3) {
            await sleep(10);
        }
        for (let i = 0; i < workers.length; i++) {
            workers[i].removeEventListener("message", loader, false);
            workers[i].addEventListener('message', function (e) {
                hamlet[e.data[0]] = e.data[1];
                finished++;
                console.log("added");
                if (finished === 3) {
                    done();
                }
            }, false);
        }
        loaded = true;
};


const test = async () => {
    if (!loaded) {
        await load()
    }
    start = performance.now();

    for (let i = 0; i < workers.length; i++) {
        workers[i].postMessage({"id": i, "url": location.href + "/resources/hamlet_" + i + ".txt"});
    }
    /**
    workers = [new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js')];

    for(let i = 0; i < workers.length; i++) {
        workers[i].addEventListener('message', function(e) {
            if(e.data === "WasmLoaded") {
                workers[i].postMessage(location.href + "/resources/hamlet_" + i + ".txt");
            }
            else {
                hamlet[i] = e.data;
                finished++;
                if (finished === 3) done();
            }
        }, false);

    }*/

};

const done = () => {
    /**
    for(worker of workers) {
        worker.terminate();
    }*/
    console.log("done");
    let text = hamlet.join("");
    result.innerText = (performance.now() - start) + " ms";
    output.innerText = text;
    finished = 0;
    hamlet = [];
};

button.addEventListener("click", event => {
    test();
});