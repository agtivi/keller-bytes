'use client';
import React, { useState, useEffect, useMemo } from 'react';

interface Book {
  id: string;
  name: string;
  abbreviation?: string;
  [key: string]: any;
}

interface Chapter {
  id: string;
  number: string;
  [key: string]: any;
}

interface VerseSummary {
  id: string;
  reference: string;
  verseCount: string;
  [key: string]: any;
}

interface Verse {
  id: string;
  verseCount: string;
  content: string;
  reference: string;
  [key: string]: any;
}

export default function RandomVerse() {
    const APIKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY;
    const KJVId = 'de4e12af7f28f599-01';

    if (!APIKey) {
    console.error('Missing API key');
    return <p>No API key</p>;
    }

    const headers = useMemo<HeadersInit>(() => ({ 'api-key': APIKey }), [APIKey]);

    const [books, setBooks] = useState<Book[]>([]);
    const [verse, setVerse] = useState<Verse | null>(null);
    const [isLoading, setLoading] = useState(false);

    // 1. Fetch books on mount
    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);
                const res = await fetch(`https://api.scripture.api.bible/v1/bibles/${KJVId}/books`, {
                headers,
                });
                const json = await res.json();
                setBooks(json.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch books:', err);
                setLoading(false);
            }
        }
        fetchBooks();
    }, [headers, KJVId]);

    // 2. A single function to fetch a random verse chain: book → chapter → verses → verse content
    async function fetchRandomVerse() {
    if (books.length === 0) {
        console.warn('No books available yet');
        return;
    } try {
        setLoading(true);

        // Pick random book
        const randomBook = books[Math.floor(Math.random() * books.length)];
        console.log('Chosen book:', randomBook.name);

        // Fetch chapters
        const chaptersRes = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${KJVId}/books/${randomBook.id}/chapters`,
            { headers }
        );
        const chaptersJson = await chaptersRes.json();
        const chapters: Chapter[] = chaptersJson.data;
        if (chapters.length === 0) {
            throw new Error('No chapters found');
        }

        // Pick random chapter
        const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
        console.log('Chosen chapter:', randomChapter.number);

        // Fetch verses
        const versesRes = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${KJVId}/chapters/${randomChapter.id}/verses`,
            { headers }
        );
        const versesJson = await versesRes.json();
        const verses: VerseSummary[] = versesJson.data;
        if (verses.length === 0) {
            throw new Error('No verses found');
        }

        // Pick random verse
        const randomVerseSummary = verses[Math.floor(Math.random() * verses.length)];
        console.log('Chosen verse:', randomVerseSummary.reference);

        // Fetch verse content
        const verseRes = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${KJVId}/verses/${randomVerseSummary.id}`,
            { headers }
        );
        const verseJson = await verseRes.json();

            setVerse(verseJson.data);
        } catch (err) {
            console.error('Error fetching random verse:', err);
        } finally {
            setLoading(false);
        }
    }

    // Fetch random verse when books load (initially)
    useEffect(() => {
        if (books.length > 0) {
            fetchRandomVerse();
        }
    }, [books]);

    if (isLoading) return <p>Loading...</p>;
    if (!verse) return <p>No verse loaded yet</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-2">{verse.reference}</h1>
            <div
            dangerouslySetInnerHTML={{
                __html: cleanVerseHTML(verse.content),
            }}
            />
            <button
            className="bg-blue-300 pl-2 pr-2 rounded mt-10"
            onClick={() => {
                fetchRandomVerse();
            }}
            >
            Pull New Random Verse
            </button>
        </div>
    );
}

function cleanVerseHTML(html: string) {
    if (!html) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove all <span> elements (which usually contain verse numbers)
    doc.querySelectorAll('span').forEach((span) => span.remove());

    return doc.body.innerHTML;
}
