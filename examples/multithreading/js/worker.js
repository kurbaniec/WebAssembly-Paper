import('./bower_components/showdown/dist/showdown.js').then(showdown => {
    self.addEventListener('message', async function(e) {
        const url = e.data.url;
        const converter = new showdown.Converter();
        converter.setFlavor('github');
        const text = await fetch(url).then(response => response.text());
        const html = converter.makeHtml(text);
        self.postMessage([e.data.id, html]);
    }, false);
});
