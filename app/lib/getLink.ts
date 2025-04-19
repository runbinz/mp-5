import getCollection, { LINKS_COLLECTION } from "@/db";

export default async function getLink(alias: string): Promise< string | null> {

    if (!alias){
        return null;
    }

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const data = await linksCollection.findOne({ alias });

    if (data === null) {
        return null;
    }
    return data.originalUrl;
}