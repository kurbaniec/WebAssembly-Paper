import("../pkg").then(wasm => {
    self.postMessage("WasmLoaded");
    self.addEventListener('message', async function (e) {
        const url = e.data.url;
        const data = await fetch(url).then(response => response.text());
        const text = wasm.reverse(data);
        self.postMessage([e.data.id, text]);
    }, false);
});