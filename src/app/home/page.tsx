'use client'
import Image from "next/image";
import SplitText from "../components/reactbits/SplitText";
import TronBackground from "../components/self/Tron";
import { useRef, useState, useEffect } from 'react'

export default function Home() {
  const containerRef = useRef(null)

  const [titleFullHeight, setTitleFullHeight] = useState(false);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
    
    setTitleFullHeight(true);
  };

  useEffect(() => {
      document.body.classList.add('overflow-hidden');
  });

  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className={`text-center content-center sm:items-start translate-all duration-500 ease-in-out ${titleFullHeight ? "h-full" : "h-[100vh]"} text-4xl font-bodoni-moda`}>
        <SplitText
          text="Welcome to KellerBytes"
          className="text-4xl font-bodoni-moda text-center h-[5vh] z-20"
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
      <div className={`grid grid-cols-2 translation-all duration-700 ease-in-out`}
            style={{ paddingTop: titleFullHeight ? '0px' : '100vh' }}
      >
        <div className="text-center content-center ml-20">
          <div className="bg-gray-600 rounded-xl text-xl">
            <div className="pt-3 pr-3 pl-3 pb-3">
              Hey there, my name's Anthony Keller and I'm a 2025 graduate from The Ohio State University with a B.S. in Computer Science and Engineering.
              Here on the right, you can see my loving parents and I after I completed the Order of the Engineer ceremony!
              <br/>
              <br/>
              I made this website to gain some experience with web development and some smaller projects, so feel free to explore and see any cool features
              I might have added!
              <div className="text-2xl text-center">
                And may God be with you ✟
              </div>
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
