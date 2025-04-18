'use server'
import getCollection, {LINKS_COLLECTION} from "@/db";

export default async function validateDupe(alias: string): Promise<boolean>{
    try{
        const urlCollection = await getCollection(LINKS_COLLECTION);
        const exists = await urlCollection.findOne({ alias: alias });
        return !exists;
    }
    catch(e){
        console.error(e);
        return false;
    }
}