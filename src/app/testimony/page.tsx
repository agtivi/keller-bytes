'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Testimony() {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsNormal(true);
        }, 3000)
    })

    return (
        <div className="h-screen flex items-center justify-center text-center px-4 text-xl transition-all">
            <div className={`opacity-0 ${isNormal ? "max-w-4xl" : "flex " } items-center justify-center `}>
                <div className={`transition-all duration-500 ${isNormal ? "opacity-100" : "opacity-0"}`}>
                    Hey there, I figured what better a place to share my testimony than on here.
                    <br/><br/>
                    My belief towards God has always wavered throughout my life, for 16 years of it I didn&apos;t even believe in Him at all. At first I did, then I didn&apos;t, and now I do again.
                    <br/><br/>
                    The reason I do again is gonna sound like I was just hysteric, but truly I know what I experienced and it honestly wasn&apos;t anything big. I was just laying in bed one
                    night and heard a very loud and scary exhale into my ear. I thought I was being haunted, and so my previous beliefs of just no spiritual activity being real were laid
                    to rest. I immediately turned to God for protection because He&apos;s the all powerful, and in this turning towards Him I saw so much more. 
                    <br/><br/>
                    The secret to true happiness, the ability to love honestly, and the genuine fulfillment of life. For one week of my life, I&apos;ve been able to toss away all worries, 
                    love everyone with a true heart, trust it all to Him, and truly be happy. 
                    <br/><br/>
                    I&apos;ve lost that fulfillment now... He&apos;s blessed me with so many experiences in life, but since then I&apos;ve failed time and time again 
                    to be able to truly toss aside my flesh. I worry for a job, I worry for a future, I worry for my wellbeing, for no reason I&apos;ve lost my ability to completely trust in 
                    Him. I pray I get it back some day, and I know that He will give it to me eventually. Just when I am ready. 
                    <br/><br/>
                    For now, I&apos;m trying my best to learn and program projects to show myself off to people in hopes that I&apos;ll get a job. Truly I&apos;ve failed. Once I gain the heart to do 
                    this, not for other people&apos;s attention and recognition of my abilities, but for my own genuine love of programming and software development, 
                    then I will regain my spot alongside Him in happiness and fulfillment. For now though, I struggle. If you&apos;ve read this through the whole way, thank you for reading and 
                    taking the time to learn a little bit about God&apos;s presence in my life. May He touch your life in some manner to bless you, or show you a blessing He&apos;s done for
                    you. And no matter who you are, just know you are truly loved, if not by anyone else in this world... then most certainly by
                    {" "}<Link href="https://www.biblegateway.com/passage/?search=Matthew%205&version=NIV" className="text-gray-400 font-bold">Him.</Link>
                </div>
            </div>
            {/* <div className={`w-full h-full flex items-center justify-center bg-black`}>
                <div className={`h-[80vh] w-[5vw] bg-white`}>
                    hi
                </div>
                <div className={`h-[10vh] w-[10vw] bg-white`}>
                    
                </div>
            </div> */}
        </div>
    );
};