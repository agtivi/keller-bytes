'use client';
import React, { useState, useEffect, useMemo } from 'react';
interface Verse {
    id: string;
    verseCount: string;
    content: string;
    reference: string;
    [key: string]: any;
}

export default function RandomVerse() {
    const [verse, setVerse] = useState<Verse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRandomVerse() {
        setIsLoading(true);
        try {
            const res = await fetch('/api/random-verse');
            const data = await res.json();
            if (data?.verse) {
                setVerse(data.verse);
            } else {
                console.warn('No verse returned');
            }
        } catch (err) {
            console.error('Error fetching verse:', err);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchRandomVerse();
    }, []);

    useEffect(() => {
        if (verse) console.log("Verse: ", verse.id);
    }, [verse]);

    if (isLoading) {
        return <div className="w-full min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    }

    if (!verse) {
        return <div className="w-full min-h-screen flex items-center justify-center"><p>No verse loaded.</p></div>;
    }

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-2">{verse.reference}</h1>
            <div dangerouslySetInnerHTML={{ __html: cleanVerseHTML(verse.content) }} />
            <button
                onClick={fetchRandomVerse}
                className="bg-blue-300 px-4 py-2 rounded mt-10"
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
    doc.querySelectorAll('span.v').forEach((span) => span.remove());
    doc.querySelectorAll('span.wj').forEach((span) => {
        (span as HTMLElement).style.color = 'red';
        //or
        // span.classList.add('text-red-600'); //to use Tailwind
    });

    return doc.body.innerHTML;
}
