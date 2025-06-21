'use client'
import Image from "next/image";
import SplitText from "../components/reactbits/SplitText";
import TronBackground from "../components/self/Tron";
import { useRef } from 'react'

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};




export default function Home() {
  const containerRef = useRef(null)

  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      <div className="text-center content-center sm:items-start h-176 text-4xl font-bodoni-moda">
        <SplitText
          text="Welcome to KellerBytes"
          className="text-4xl font-bodoni-moda text-center h-12 z-20"
          delay={80}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
        <div className="grid grid-cols-2">
            <div className="text-center text-lg content-center ml-20 mr-20">
              <div className="bg-gray-600 rounded-xl">
                
                <div className="pt-3 pr-3 pl-3 pb-3">
                  Hey there, my name's Anthony Keller and I'm a 2025 graduate from The Ohio State University with a B.S. in Computer Science and Engineering.
                  Here on the right, you can see my loving parents and I after I completed the Order of the Engineer ceremony!
                  <br/>
                  <br/>
                  I made this website to gain some experience with web development and some smaller projects, so feel free to explore and see any cool features
                  I might have added!
                </div>
              </div>
            </div>
            <div className="flex items-center h-180 justify-center">
              <div className="w-130">
                <Image
                  className="rounded-4xl"
                  src="/order-of-engineer.jpg"
                  alt="Order of Engineer post-ceremony with parents"
                  width="600"
                  height="100"
                />
              </div>
            </div>
        </div>
    </div>
  );
}
