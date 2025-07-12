'use client'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';

export default function GravityGame() {


    return (
        <div className="absolute">
            <div className="absolute">
                <Canvas style={{height: '100vh', width: '100vw', background: 'black'}}>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                    <mesh>
                        <sphereGeometry args={[0.25,32]}/>
                        <meshStandardMaterial color={'#2f74c0'}/>
                    </mesh>

                    <OrbitControls/>
                    {/* <MemoGrid /> */}
                </Canvas>
            </div>
            <div className="absolute">
                
            </div>
        </div>
    )
}