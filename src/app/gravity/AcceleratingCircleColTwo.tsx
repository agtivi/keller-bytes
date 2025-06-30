'use client';
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { float } from 'three/tsl';


export default function AcceleratingCircleColTwo(){

    const [isOn, setIsOn] = useState(false);

    return(
        <div className="">
            <div className="">
                <br/> <br/>
                With the scene set up using React Three Fiber, we can go ahead and start trying to replicate what kavan does in his video.
                First he just does a simple vector with a circle falling down the screen. So I'll just update the position of a sphere using
                a provided delta variable from R3F.
                <br/>
            </div>
            <div className="pt-10 pb-20 grid grid-cols-2 h-150">
                <div className="flex justify-center items-center">
                    <button className="bg-blue-500 h-[5vh] rounded pl-1 pr-1 mb-3" onClick={() => setIsOn(!isOn)}>
                        Click Here to run
                    </button>
                </div>
                <div className="flex justify-center bg-black">
                    {isOn &&
                        <Canvas className="" style={{ height: '50vh', width: '75%', background: 'black'}}>
                            <ambientLight intensity={Math.PI / 2} />
                            <spotLight
                                position={[10, 10, 10]}
                                angle={0.15}
                                penumbra={1}
                                decay={0}
                                intensity={Math.PI}
                            />
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                            <Circle position={[0, 5, 0]} />
                        </Canvas>
                    }
                </div>
            </div>
            
        </div>
    )
}

function Circle(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!);

  // velocity needs to persist between frames → useRef, not let
  const velocity = useRef(0);          // world‑units / second
  const g = -9.81;                     // acceleration (m s‑2)
  const floorY = -2;                   // “ground” height
  const restitution = 0.7;             // 0 = no bounce, 1 = perfect

  useFrame(({ clock }, delta) => {
    // delta is seconds since last frame
    velocity.current += g * delta;                       // v = v₀ + a·dt
    mesh.current.position.y += velocity.current * delta; // y = y₀ + v·dt

    // collision with ground
    if (mesh.current.position.y < floorY) {
      mesh.current.position.y = floorY;
      velocity.current = -velocity.current * restitution;
    }
  });

  return (
    <mesh ref={mesh} {...props} scale={0.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2f74c0" />
    </mesh>
  );
}
