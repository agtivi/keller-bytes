'use client'
import Image from "next/image";

export default function Home() {
    const jaggedLines = [...Array(10)].flatMap((_, i) => {
    const segments = [];
    let lastx = i*10;
    let lasty = 0;

    for (let h = 0; h < 50; h++) {
      let next = Math.max(Math.floor(Math.random()*8),3);
      const temp = Math.random();

      if (temp < 0.15) {
        segments.push(
          <line
            key={`${i}-${h}`}
            x1={lastx}
            y1={lasty}
            x2={lastx+next}
            y2={lasty}
            stroke="white"
            strokeWidth="1"
          />
        );
        lastx = lastx+next;
      } else if (temp < 0.3) {
        segments.push(
          <line
            key={`${i}-${h}`}
            x1={lastx}
            y1={lasty}
            x2={lastx-next}
            y2={lasty}
            stroke="white"
            strokeWidth="1"
          />
        );
        lastx = lastx-next;
      } else {
        segments.push(
          <line
            key={`${i}-${h}`}
            x1={lastx}
            y1={lasty}
            x2={lastx}
            y2={lasty+next}
            stroke="white"
            strokeWidth="1"
          />
        );
        lasty = lasty+next;
      }
      next = Math.max(Math.floor(Math.random()*8),3);
    }

    return segments;
  });


  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* <div className="line">
      </div> */}
      <div className="w-full h-[140px]">
        <svg className="w-full h-[500px] pt-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {jaggedLines}
        </svg>
      </div>
      <main className="gap-[32px] row-start-2 text-center content-center sm:items-start text-4xl font-bodoni-moda">
        Welcome to KellerBytes
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
