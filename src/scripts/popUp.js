import {$} from '../utils/selectors'

$('#search-form').addEventListener('submit', async (event)=>{
    event.preventDefault()
    const keywords= $('#to-search',event.target).value
    const url =  'https://www.linkedin.com/search/results/people/?keywords='+ keywords
    const {id} = await chrome.tabs.create({url})
    
    chrome.scripting.executeScript({
                target:{tabId: id},
                files:["scripts/scrappProfiles.js"]
            })


})