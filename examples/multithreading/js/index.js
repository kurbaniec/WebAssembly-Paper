/**const worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    document.getElementById('result').textContent = e.data;
}, false);

worker.postMessage("start");*/

const button = document.getElementById("start");

async function extractFramesFromVideo(videoUrl, fps=1) {
    return new Promise(async (resolve) => {

        // fully download it first (no buffering):
        let videoBlob = await fetch(videoUrl).then(r => r.blob());
        let videoObjectUrl = URL.createObjectURL(videoBlob);
        let video = document.createElement("video");
        let seekResolve;
        video.addEventListener('seeked', async function() {
            if(seekResolve) seekResolve();
        });

        video.src = videoObjectUrl;
        // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
        while((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2) {
            await new Promise(r => setTimeout(r, 1000));
            video.currentTime = 10000000*Math.random();
        }
        let duration = video.duration;

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let [w, h] = [video.videoWidth, video.videoHeight];
        canvas.width =  w;
        canvas.height = h;

        let frames = [];
        let interval = 1 / fps;
        let currentTime = 0;

        while(currentTime < duration) {
            video.currentTime = currentTime;
            await new Promise(r => seekResolve=r);

            context.drawImage(resources, 0, 0, w, h);
            let base64ImageData = canvas.toDataURL('image/webp');
            frames.push(base64ImageData);
            currentTime += interval;
            console.log(currentTime + " / " + duration);
        }
        resolve(frames);
    });
}
async function test() {
    let frames = await extractFramesFromVideo("/resources/drive_1.mp4");
    frames.reverse();
    let video = Whammy.fromImageArray(frames, 1);
    let urlDownload = (window.URL ? URL : webkitURL).createObjectURL(video);
    document.getElementById('awesome').src = (window.URL ? URL : webkitURL).createObjectURL(video);
    const link = document.createElement("a");
    link.href = urlDownload;
    link.download = "resources.webm";
    link.click();
    setTimeout(function(){
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(urlDownload);
    }, 100);
}

button.addEventListener("click", event => {
    test();
});