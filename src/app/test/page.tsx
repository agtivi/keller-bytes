'use client'
import Image from "next/image";

export default function Home() {


  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="text-center content-center sm:items-start bg-yellow-500 h-176 text-4xl font-bodoni-moda">
        Welcome to KellerBytes
      </div>
      <div className="grid grid-cols-2">
        <div className="text-center content-center">
          My name's Anthony Keller and I'm a 2025 B.S. in Computer Science and Engineering graduate from the Ohio State University. 
        </div>
        <div className="flex content-center h-200 justify-center bg-green-500">
          <Image
            src="/suit_photo.jpg"
            alt="Casual Headshot"
            width="400"
            height="100"
          />
        </div>
      </div>
    </div>
  );
}
