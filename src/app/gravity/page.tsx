'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import FallingText from "../components/reactbits/FallingText";
import AcceleratingCircleColTwo from "./AcceleratingCircleColTwo";
import Orbit from "./Orbit";

export default function Gravity(){
    const [isFinished, setFinished] = useState(false);
    const [isDisappearing, setDisappearing] = useState(false);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        window.scrollTo({
            top:1,
            left:1,
        });
        
        const goneTimeout = setTimeout(() => {
            setFinished(true);
            document.body.classList.remove('overflow-hidden');
        }, 5000)
        const fadeTimeout = setTimeout(() => {
            setDisappearing(true);
        }, 4000)
        return () => {
            clearTimeout(goneTimeout);
            clearTimeout(fadeTimeout);
        };
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
            <div className="text-center pt-[5vh] text-8xl font-bodoni-moda">
                Gravity
            </div>
            <div className="h-[30vh] content-center text-xl">
                For this page I&apos;m taking inspiration from a video where the youtuber <em>kavan</em> simulates gravity in C++. I&apos;ll try to do the same on here utilizing
                React Three Fiber.
                <br/><Link href="https://www.youtube.com/watch?v=_YbGWoUaZg0&ab_channel=kavan" className="text-blue-400 underline"> Here&apos;s the link to his video</Link>
            </div>
            <div>
                <AcceleratingCircleColTwo/>
            </div>
            <div>
                <Orbit/>
            </div>
        </div>
    )
}