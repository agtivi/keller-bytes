import { NextResponse } from 'next/server';

const API_KEY = process.env.BIBLE_API_KEY;
const KJV_ID = 'de4e12af7f28f599-01';

export async function GET() {
    if (!API_KEY) {
        return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    const headers = { 'api-key': API_KEY };

    try {
        const bRes = await fetch(`https://api.scripture.api.bible/v1/bibles/${KJV_ID}/books`, { headers });
        const books = (await bRes.json()).data;
        const book = books[Math.floor(Math.random() * books.length)];

        const cRes = await fetch(`https://api.scripture.api.bible/v1/bibles/${KJV_ID}/books/${book.id}/chapters`, { headers });
        const chapters = (await cRes.json()).data;
        let chapter = chapters[Math.floor(Math.random() * chapters.length)];

        while(chapter.id.includes('.intro')) {
            console.log("Skipping chapter: ", chapter.id, " in chapters ", chapters);
            chapter = chapters[Math.floor(Math.random() * chapters.length)];
        }

        const vRes = await fetch(`https://api.scripture.api.bible/v1/bibles/${KJV_ID}/chapters/${chapter.id}/verses`, { headers });
        const verses = (await vRes.json()).data;
        const verseSummary = verses[Math.floor(Math.random() * verses.length)];

        const fullRes = await fetch(`https://api.scripture.api.bible/v1/bibles/${KJV_ID}/verses/${verseSummary.id}`, { headers });
        const verse = (await fullRes.json()).data;

        return NextResponse.json({ verse });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Failed to fetch verse' }, { status: 500 });
    }
}
