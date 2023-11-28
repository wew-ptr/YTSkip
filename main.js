const sleep = ms => new Promise(resolve=>setTimeout(resolve, ms));

chrome.runtime.onMessage.addListener(r=>{
    switch (r) {
        case "skip":
            isAdsShowing() && SkipAds();
            break;
    }
})


async function SkipAds() {
    console.log("SKIPPING")
    document.querySelector(".video-stream.html5-main-video").currentTime = 3000;
    await sleep(30);
    document.querySelector(".ytp-ad-skip-button-modern.ytp-button")?.click();
}

function isAdsShowing() {
    return Boolean(document.querySelector(".ytp-ad-player-overlay-skip-or-preview"))
}

const id = setInterval(()=>{
    if (document.querySelector("#primary")) {
        clearInterval(id);
        setInterval(async()=>{
            isAdsShowing() && (await chrome.storage.local.get())["auto-skip"] && SkipAds()
        }, 100)
    }
}, 100)