'use server';
import getCollection, { LINKS_COLLECTION } from "@/db";
import { LinkProps } from "@/types";

export default async function createNewLink(
    alias: string,
    originalUrl: string,
): Promise<LinkProps> {
    console.log('Shortening link...');
    const p = {
        originalUrl: originalUrl,
        alias: alias,
    }

    const linksCollection = await getCollection(LINKS_COLLECTION);

    const exists = await linksCollection.findOne({ alias: alias });
    if (exists) {
        throw new Error("Alias already exists");

    }

    const res = await linksCollection.insertOne({ ...p });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }
    return { ...p };
}