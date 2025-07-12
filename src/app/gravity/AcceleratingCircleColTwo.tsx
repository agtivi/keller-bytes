'use client';
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';


export default function AcceleratingCircleColTwo(){

    const [isOn, setIsOn] = useState(false);

    return(
        <div className="">
            <div className="text-xl">
                With the scene set up using React Three Fiber, we can go ahead and start trying to replicate what kavan does in his video.
                First he just does a simple accelerating vector with a sphere falling down the screen. So I&apos;ll just update the position of 
                a sphere using a provided delta variable from R3F.
                <br/>
            </div>
            <div className="mt-[10vh] grid grid-cols-2 gap-[5vw] h-[50vh]">
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


    // velocity needs to persist between frames -> useRef, not let
    const velocity = useRef([Math.random() < 0.5 ? Math.random() * -3 : Math.random()*3,0]);          // world‑units / second
    const g = -9.81;                     // acceleration (m/s ^2)
    const floorY = -2;                   // “ground” height
    const wallX = 4;
    const restitution = 0.7;             // 0 = no bounce, 1 = perfect

    useFrame((_, delta) => {
        // delta is seconds since last frame
        if(Math.abs(velocity.current[0]) <= 0.02 ) {
            velocity.current[0] = 0;
        } else {                                                // v_x = v_x0 + a_x*dt
            velocity.current[0] *= 0.995;                    
        }
        velocity.current[1] += g * delta;                       // v_y = v_y0 + a_y*dt
        mesh.current.position.x += velocity.current[0] * delta; // x = x_0 + v*dt
        mesh.current.position.y += velocity.current[1] * delta; // y = y_0 + v*dt

        // collision with ground
        if (mesh.current.position.y < floorY) {
            mesh.current.position.y = floorY;
            velocity.current[1] = -velocity.current[1] * restitution;
        }
        if (mesh.current.position.x < -wallX || mesh.current.position.x > wallX){
            mesh.current.position.x = Math.sign(mesh.current.position.x) * wallX;
            velocity.current[0] = -velocity.current[0];
        }
    });

    return (
        <mesh ref={mesh} {...props} scale={0.5}>
            <sphereGeometry args={[1, 32]} />
            <meshStandardMaterial color="#2f74c0" />
        </mesh>
    );
}
