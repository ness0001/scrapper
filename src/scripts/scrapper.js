import { profilesSelectors } from '../config/scrappingSelectors'
import { $, $$ } from '../utils/selectors'
import {getCsrf} from '../utils/cookie'
import axios from 'axios'
import dayjs  from 'dayjs'


const getContactInfo = async ()=>{

    try {
        
        //const csrf = getCsrf('JSESSIONID=',document.cookie)
        const csrf = getCsrf(document.cookie)
    
        const contactInfoNamne= $(profilesSelectors.contactInfo).href.replace('https://www.linkedin.com/in','').replace('overlay/contact-info/','') ?? ''

        const contactInfoURL = `https://www.linkedin.com/voyager/api/identity/profiles${contactInfoNamne}profileContactInfo` 

        const {data} =  await axios.get(contactInfoURL, {headers: {'csrf-token': csrf}}) 

        return data 

    } catch (error) {

        console.log('Error:Scrapper.js ~ Line:26',error)

    }


}

const getEspecificInfo =(selector)=>{
    const elements = $$(selector)

    return elements.map((listItem) => {
        if(!$('.pvs-entity__path-node', listItem))
         {
            const [title, enterprice, dateString] = $$('span[aria-hidden]',listItem).map(element => element.textContent)
    
            const [parsedDate] = dateString.match(/.+·|\d{4} - \d{4}|\d{4}/)


            
            const  [startDate, endDate] = (parsedDate?.replace(/\s|·/g,'').split('-') ?? []).map(dateElement => dayjs(dateElement).isValid() ? dayjs(dateElement).format('MM - YYYY'):null)
 

            return({
                title,
                enterprice,
                startDate,
                endDate
            })
         }
        
        
    })
    
}



const getTitles = (selector)=>{

    const elements = $$(selector)

    const titles = []

    elements.forEach((expirienceListItem) => {
        const elementTitle = $('span[aria-hidden]',expirienceListItem)

        titles.push(elementTitle.textContent)
    })

    return titles
}


async function scrap (){
        
    const name = $(profilesSelectors.name).textContent.trim()


    const contactInfo = await getContactInfo()

    const experienceTitles = getEspecificInfo(profilesSelectors.experienceElements)
    
    const educationTitles = getEspecificInfo(profilesSelectors.educationElements)

    const profile = {
        name,
        contactInfo,
        experienceTitles,
        educationTitles
    }

    console.log(profile)

}

scrap()

