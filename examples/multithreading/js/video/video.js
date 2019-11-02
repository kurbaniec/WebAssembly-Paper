/**const sync = document.createElement('div');
document.body.appendChild(sync);

const init = () => {
    const mySpan = document.createElement('span');
    mySpan.appendChild(document.createTextNode('Hello world'));
    document.body.appendChild(mySpan);
};

setTimeout(init, 0);*/

async function test() {

    let videoBlob = await fetch("http://localhost:8080/resources/drive_1.mp4").then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    //let video = document.createElement('video');
    //let video = document.getElementById("thread1");

    //video.outerHTML = video.outerHTML.replace("src=\"Na\"", "src=\"" + videoObjectUrl + "\"");

    let video = document.createElement('video');
    video.src = videoObjectUrl;
    video.controls = true;
    document.body.appendChild(video);
    let testo = document.getElementById("testo");
    testo.innerHTML = "Hallo Welt!";
}

setTimeout(test, 0);

/**
async function extractFramesFromVideo(videoUrl, fps=1) {
    return new Promise(async (resolve) => {
        // fully download it first (no buffering):
        let videoBlob = await fetch(videoUrl).then(r => r.blob());
        let videoObjectUrl = URL.createObjectURL(videoBlob);
        //let video = document.createElement('video');
        let video = document.getElementById("thread1");
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
        // let duration = video.duration;
        let duration = 10;

        let canvas = new OffscreenCanvas(3840, 2160);
        let context = canvas.getContext('2d');
        //let [w, h] = [video.videoWidth, video.videoHeight];
        let [w, h] = [3840.0, 2160.0];
        canvas.width =  w;
        canvas.height = h;

        let frames = [];
        let interval = 1 / fps;
        let currentTime = 0;

        while(currentTime < duration) {
            video.currentTime = currentTime;
            //await new Promise(r => seekResolve=r);

            context.drawImage(video, 0, 0, w, h);
            let base64ImageData = canvas.toDataURL('image/webp');
            frames.push(base64ImageData);
            currentTime += interval;
            console.log(currentTime + " / " + duration);
        }
        resolve(frames);
    });
}
async function test() {
    let frames = await extractFramesFromVideo("http://localhost:8080/resources/drive_1.mp4");
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

setTimeout(test, 0);*/