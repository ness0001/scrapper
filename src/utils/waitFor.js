import { $ } from "./selectors";

export const waitForSelector = async (selector, time = 500, timeOut = 5000) =>{
    return new Promise((resolve, reject)=>{
    let cont =0 
    const interval = setInterval(()=>{
        cont++
        if (cont === timeOut/time+1)
        {
            clearInterval(interval)
            reject(false)
        }
        if($(selector))
        {
            clearInterval(interval)
            resolve(true)

        }
    },time)
}) 
}

export const waitForScroll= async (scroll=100, time = 500, timeOut = 10000 )=>{
    let y = 0
    return new Promise ((resolve, reject)=>{
        const interval = setInterval(()=>{
            if (y>= document.body.scrollHeight - document.body.scrollTop)
            {
                clearInterval(interval)
                resolve(true)
            }
            y+=scroll
            if((timeOut/time+1) > (y/scroll+2*scroll)) {
                clearInterval(interval);
                reject(false);
              }
            window.scrollTo({top: y, behavior: 'smooth'})
        },time)
    })
    
}