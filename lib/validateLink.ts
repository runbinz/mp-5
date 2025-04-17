'use server';

export default async function validateLink(originalUrl: string): Promise<boolean> {
    try {
        const response = await fetch(originalUrl);
        return response.status >= 200 && response.status < 400;
    }
    catch (e) {
        return false;
    }
}