'use server';
import getCollection, {LINKS_COLLECTION} from "@/db";

export async function validateLink(originalUrl: string): Promise<boolean> {
    try {
        const response = await fetch(originalUrl);
        return response.status >= 200 && response.status < 400;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}

export async function linkValidation(link: string): Promise<boolean>{
    try{
        const urlCollection = await getCollection(LINKS_COLLECTION);
        const exists = await urlCollection.findOne({ link: link });
        return !exists;
    }
    catch(e){
        console.error(e);
        return false;
    }
}