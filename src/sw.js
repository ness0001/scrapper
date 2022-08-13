import { db } from "./config/connectionDexie"

const inyectScript = async (path, tabId)=>{
    return chrome.scripting.executeScript({
        target:{tabId},
        files:[path]
    }) 
}

const inyectScrapp =(tabId)=>{
    return inyectScript("scripts/scrappProfiles.js", tabId)
}

chrome.action.onClicked.addListener((tab)=>{
    inyectScrapp(tab.id) 
})

chrome.runtime.onConnect.addListener((port)=>{
    
    if(!(port.name === 'secureChannelScrap')) 
    throw new Error('Not secure channel')

    port.onMessage.addListener(async (msg, {sender: {tab: {id: tabId, url: tabUrl}}}) => {
        //console.log(msg)
        
        const originalUrl = new URLSearchParams(tabUrl.match(/\?.+/)[0].replace('?'))
        
        const page = originalUrl.has('page')? originalUrl.get('page') : 2   
        
        await chrome.tabs.update(tabId,{url: tabUrl+'&page='+page})

        db.urlsProfiles.add({ urls: msg.urlsProfiles })
        
        inyectScrapp(tabId)

    })
})