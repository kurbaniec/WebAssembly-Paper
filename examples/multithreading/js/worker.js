self.addEventListener('message', async function(e) {
    const url = e.data;
    const data = await fetch(url).then(response => response.text());
    const raw = data.split("");
    const reversed = raw.reverse();
    const text = reversed.join("");
    self.postMessage(text);
}, false);