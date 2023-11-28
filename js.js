const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


document.querySelectorAll("button")[0].addEventListener("click", async()=>{
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    chrome.tabs.sendMessage(tab.id, "skip")
})

chrome.storage.local.get().then(v => document.querySelectorAll("button")[1].style.color = Number(v["auto-skip"]) ? "green" : "red")
document.querySelectorAll("button")[1].addEventListener("click", async (e) => {
    const autoSkip = Number(!(await chrome.storage.local.get())["auto-skip"])
    chrome.storage.local.set({ "auto-skip": autoSkip }).then(d => {
        e.target.style.color = ["red", "green"][autoSkip]
    })
})