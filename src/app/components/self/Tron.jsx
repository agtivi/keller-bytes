import { useRef, useEffect } from "react";

const GRID_SIZE = 20;

const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

const TronBackground = ({ delay = 100, trailLife = 1000 }) => {
  const containerRef = useRef(null);
  const occupied = useRef(new Set()); // Track occupied grid positions

  useEffect(() => {
    const directions = ["down", "down", "down", "down", "down", "down", "left", "right"];

    const spawnTrail = () => {
      const container = containerRef.current;
      if (!container) return;

      let x = snapToGrid(Math.random() * window.innerWidth);
      let y = 0;
      let dir = "down";

      const interval = setInterval(() => {
        const key = `${x},${y}`;
        if (occupied.current.has(key)) {
          clearInterval(interval); // Collision detected, stop this trail
          return;
        }
        occupied.current.add(key);

        const trail = document.createElement("div");
        trail.className = "tron-segment";

        if (dir === "down") {
          trail.style.width = "2px";
          trail.style.height = `${GRID_SIZE}px`;
          trail.style.left = `${x}px`;
          trail.style.top = `${y}px`;
          y += GRID_SIZE;
        } else if (dir === "left") {
          trail.style.width = `${GRID_SIZE}px`;
          trail.style.height = "2px";
          x -= GRID_SIZE;
          trail.style.left = `${x}px`;
          trail.style.top = `${y}px`;
        } else if (dir === "right") {
          trail.style.width = `${GRID_SIZE}px`;
          trail.style.height = "2px";
          trail.style.left = `${x}px`;
          trail.style.top = `${y}px`;
          x += GRID_SIZE;
        }

        container.appendChild(trail);

        // Fade out and remove
        setTimeout(() => {
          trail.classList.add("fade-out");
          setTimeout(() => {
            if (container.contains(trail)) {
              container.removeChild(trail);
            }
            // Also free up the occupied position for reuse
            occupied.current.delete(key);
          }, 300);
        }, trailLife);

        // Randomly change direction with a bias towards down
        if (Math.random() < 0.1) {
          dir = directions[Math.floor(Math.random() * directions.length)];
        }

        // Stop when offscreen
        if (
          y > window.innerHeight + GRID_SIZE ||
          x < -GRID_SIZE ||
          x > window.innerWidth + GRID_SIZE
        ) {
          clearInterval(interval);
        }
      }, delay);
    };

    for(let i = 0; i < 20; i++){
        spawnTrail();
    }

    return () => {
      // Clean up all occupied positions on unmount
      occupied.current.clear();
    };
  }, [delay, trailLife]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ backgroundColor: "black" }}
    />
  );
};

export default TronBackground;
