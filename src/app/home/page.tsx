'use client'
import SplitText from "../components/reactbits/SplitText";
import Stack from "../components/reactbits/Stack";
import { useState, useEffect } from 'react'
import Link from "next/link";

const images = [
  { id: 1, img: "/order-of-engineer.jpg" },
  { id: 2, img: "/sinait-arch.jpg"  },
  { id: 3, img: "/suit_photo.jpg"},
  { id: 4, img: "/bridge_photo.jpg" }
];


export default function Home() {

  const [titleFullHeight, setTitleFullHeight] = useState(false);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
    
    setTitleFullHeight(true);
  };

  useEffect(() => {
      document.body.classList.add('overflow-hidden');

      return () => {
        document.body.classList.remove('overflow-hidden');
      };
  }, []);

  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className={`bg-gray-700 text-center content-center sm:items-start translate-all duration-800 ease-in-out ${titleFullHeight ? "h-full" : "h-[100vh]"} text-4xl font-bodoni-moda`}>
        <SplitText
          text="Welcome to KellerBytes"
          className="text-4xl font-bodoni-moda text-center h-[5vh] z-20"
          delay={100}
          duration={2}
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
      <div className={`grid grid-cols-2 translation-all duration-900 ease-in-out`}
            style={{ paddingTop: titleFullHeight ? '0px' : '100vh' }}
      >
        <div className="text-center content-center">
          <div className="bg-gray-600 rounded-xl h-[23vh] transition-all ml-20 mr-10 text-[18px] hover:h-[26vh] hover:text-[21px] hover:ml-15 hover:mr-0">
            <div className="pt-3 pr-3 pl-3 pb-3">
              Hey there, my name&apos;s Anthony Keller and I&apos;m a 2025 graduate from The Ohio State University with a B.S. in Computer Science and Engineering.
              Here on the right, you can see a few pictures of me and some of me and my family!
              <br/>
              <br/>
              I made this website to gain some experience with web development and some smaller projects, so feel free to explore and see any cool features
              I might have added!
              <br/>
              <Link className="text-center" href="../testimony">
                And may God be with you ✟
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center h-180 justify-center">
          <div className="">
            {/* <Image
              className="rounded-4xl transition-all w-130 hover:w-150"
              src="/order-of-engineer.jpg"
              alt="Order of Engineer post-ceremony with parents"
              width="600"
              height="100"
            /> */}
            <Stack
              randomRotation={false}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 375, height: 375 }}
              cardsData={images}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
