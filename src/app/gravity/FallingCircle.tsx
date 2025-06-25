'use client';
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';

const codeString = `'use client';
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';

export default function FallingCircle(){
    return(
        <div className="flex justify-center">
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
                <Sphere position={[0, 5, 0]} />
            </Canvas>
        </div>
    )
}

function Sphere(props: ThreeElements['mesh']){
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta;
        }
    });

    useFrame((state, delta) => {
        if(meshRef.current) {
            meshRef.current.position.y -= delta;
            if(meshRef.current.position.y < -5) meshRef.current.position.y = 5;
        }
    });
    
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1}
        >
            <sphereGeometry args={[1, 32]} />
            <meshStandardMaterial color={'#2f74c0'}/>
        </mesh>
    )
}`

export default function FallingCircle(){
    return(
        <div className="">
            <div className="">
                <br/> <br/>
                With the scene set up using React Three Fiber, we can go ahead and start trying to replicate what kavan does in his video.
                First he just does a simple vector with a circle falling down the screen. So I'll just update the position of a sphere using
                a provided delta variable from R3F.
                <br/>
            </div>
            <div className="grid grid-cols-2 pt-10">
                <code className="code">
                    <pre>
                        {codeString}
                    </pre>
                </code>
                <div className="flex justify-center">
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
                        <Sphere position={[0, 5, 0]} />
                    </Canvas>
                </div>
            </div>
            
        </div>
    )
}

function Sphere(props: ThreeElements['mesh']){
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if(meshRef.current) {
            meshRef.current.position.y -= delta;
            if(meshRef.current.position.y < -5) meshRef.current.position.y = 5;
        }
    });
    
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1}
        >
            <circleGeometry args={[1, 32]} />
            <meshStandardMaterial color={'#2f74c0'}/>
        </mesh>
    )
}