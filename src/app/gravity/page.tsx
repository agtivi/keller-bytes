'use client'
import Link from "next/link";
import InitialCanvas from "./initialCanvas";
import {  useEffect, useRef, useState } from 'react';
import BoxScene from "./initialThree";

import FallingText from '../components/reactbits/FallingText';
  

export default function Gravity(){
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [isFinished, setFinished] = useState(false);
    const [isDisappearing, setDisappearing] = useState(false);

    useEffect(() => {
        const goneTimeout = setTimeout(() => {
            setFinished(true);
        }, 5000)
        const fadeTimeout = setTimeout(() => {
            setDisappearing(true);
        }, 4000)
        return () => {clearTimeout(goneTimeout), clearTimeout(fadeTimeout)};
    }, []);


    return(
        <div className="text-lg pl-40 pr-40">
            {!isFinished &&
                <div className={`transition-all duration-1000 ease-in-out ${isDisappearing ? 'h-[0vh]' : 'h-[120vh]'}`}>
                    <div className={` ${isDisappearing ? 'opacity-0' : 'opacity-100'}`}>
                        <FallingText
                            text={`G r a v i t y`}
                            highlightWords={["React", "Bits", "animated", "components", "simplify"]}
                            trigger="auto"
                            backgroundColor="transparent"
                            wireframes={false}
                            gravity={-0.56}
                            fontSize="2rem"
                            mouseConstraintStiffness={0.9}
                        />
                    </div>
                </div>
            }
            <div className="h-[30vh] pt-30 content-center text-xl">
                For this page I'm gonna follow a video where the youtuber <em>kavan</em> simulates gravity in C++. Being the newbie I am, I'll try to do the same on here utilizing
                Next.js.
                <br/><Link href="https://www.youtube.com/watch?v=_YbGWoUaZg0&ab_channel=kavan" className="text-blue-400 underline"> Here's the link to his video</Link>
            </div>
            <div>
                The first thing he does is creates a new window to display his simulations, so I'll try to do the same. Kavan utilizes OpenGL to run simulations, but since
                I'm trying to run everything on this website, I went and found out that there's also WebGL which hopefully does the same thing!{" "}
                <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL" className="text-blue-400 underline"> Link </Link>
                <br/><br/> Or after further researching, it turns out WebGL is already implemented into browsers! So we just need to reference it while I'm programming by using
                the {"<canvas>"} component!
            </div>
            <div>
                <InitialCanvas canvasRef={canvasRef}/>
            </div>
            <br/><br/><br/><br/>
            <div>
                Now that we have the canvas set up, we could continue to go forward and create objects within it to start simulations with. BUT, if you might notice, the code looks 
                unpleasant! So first, let's download some libraries that'll help us clean up everything and make it easier to program some simulations in Next.js. I found that a lot of
                Next.js projects use React Three Fiber for this. So I'll go ahead and follow the instructions from the{" "} 
                <Link href="https://r3f.docs.pmnd.rs/getting-started/introduction" className="text-blue-400 underline">React Three Fiber</Link> {" "}website.
                <br/><br/>
                You'll notice that the code will change a LOT. 
            </div>
            <br/><br/>
            <div className="grid grid-cols-2">
                <code className="code w-full">
                    npm install three @types/three @react-three/fiber
                </code>
            </div>
            <div>
                <BoxScene/>
            </div>
        </div>
    )
}