export const getCsrf = (cookie)=>{
    //agregar key como parametro para que funcione con el codigo comentado
    //return document.cookie.split(';').find(cookie => cookie.includes(key)).replace(key,'').replaceAll('"','').trim()
    return cookie.match(/ajax.+";/)[0].replaceAll(/"|;/g,'')

}