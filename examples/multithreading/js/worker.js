self.addEventListener('message', async function(e) {
    const url = e.data;
    const data = await fetch(url).then(response => response.text());
    const raw = data.split("");
    const reversed = raw.reverse();
    let text = reversed.join("");
    text = text.replace("Hamlet, Homer").replace("HAMLET", "HOMER");
    self.postMessage(text);
}, false);