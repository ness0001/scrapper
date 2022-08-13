import Dexie from "dexie";

export const db = new Dexie('')
db.version(1).stores({
    urlsProfiles: '++id, urls'
})