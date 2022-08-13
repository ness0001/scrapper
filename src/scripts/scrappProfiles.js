import { searchSelector } from '../config/scrappingSelectors'
import {$, $$} from '../utils/selectors'
import { waitForScroll, waitForSelector } from '../utils/waitFor'


async function init(){
    await waitForSelector(searchSelector.paginateResults)

    await waitForScroll()

    const urlsProfiles = $$(searchSelector.paginateResults).map(element => $('.app-aware-link',element).href)

    const port = chrome.runtime.connect({name: "secureChannelScrap"})
    port.postMessage({urlsProfiles})
}

init()

 