import("../pkg").then(wasm => {
    self.postMessage("WasmLoaded");
    self.addEventListener('message', async function (e) {
        const url = e.data.url;
        const text = await fetch(url).then(response => response.text());
        const html = wasm.make_html(text);
        self.postMessage([e.data.id, html]);
    }, false);
});