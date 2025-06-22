import Link from "next/link";


export default function Gravity(){

    return(
        <div className="text-center text-lg pl-40 pr-40">
            <div className="h-[30vh] pt-30 content-center text-xl">
                For this page I'm gonna follow a video where the youtuber <em>kavan</em> simulates gravity in C++. Being the newbie I am, I'll try to do the same on here utilizing
                Next.js.
                <br/><Link href="https://www.youtube.com/watch?v=_YbGWoUaZg0&ab_channel=kavan" className="text-blue-400 underline"> Here's the link to his video</Link>
            </div>
            <div>
                The first thing he does is creates a new window to display his simulations, so I'll try to do the same. Kavan utilizes OpenGL to run simulations, but since
                I'm trying to run everything on this website, I went and found out that there's also WebGL which hopefully does the same thing! 
                <br/><Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL" className="text-blue-400 underline"> Link </Link>
            </div>
        </div>
    )
}