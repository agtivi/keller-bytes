'use client'
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';

type PlanetInput = { mass: number; position: THREE.Vector3; velocity: THREE.Vector3 };

export default function Orbit() {
  const [isOn, setIsOn] = useState(false);
  const [planets, setPlanets] = useState<PlanetInput[]>([
    {
      mass: 350,
      position: new THREE.Vector3(0, -1, 0),
      velocity: new THREE.Vector3(0, 0, 0),
    },
    {
      mass: 1,
      position: new THREE.Vector3(0, -1, 2),
      velocity: new THREE.Vector3(3, 0, 0),
    },
  ]);

  const handleChange = (index: number, field: keyof PlanetInput, value: number) => {
    setPlanets((prev) =>
      prev.map((planet, i) =>
        i === index ? { ...planet, [field]: value } : planet
      )
    );
  };

  const handlePositionChange = (
    index: number,
    axis: 'x' | 'y' | 'z',
    value: number
  ) => {
    setPlanets((prev) =>
      prev.map((planet, i) =>
        i === index
          ? {
              ...planet,
              position: planet.position.clone().setComponent('xyz'.indexOf(axis), value),
            }
          : planet
      )
    );
  };

  const handleVelocityChange = (
    index: number,
    axis: 'x' | 'y' | 'z',
    value: number
  ) => {
    setPlanets((prev) =>
      prev.map((planet, i) =>
        i === index
          ? {
              ...planet,
              velocity: planet.velocity.clone().setComponent('xyz'.indexOf(axis), value),
            }
          : planet
      )
    );
  };

  const handleDelete = (index: number) => {
    setPlanets((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>
        Next we&apos;ll make different spheres at different spots in the scene, and use Gravity to simulate their orbits around one another.
      </div>
      <div className="h-[50vh] mt-[10vh] mb-[10vh] grid grid-cols-[5vw_30vw_43vw] gap-[5vw]">
        <div className="flex justify-center items-center">
          <button onClick={() => setIsOn(!isOn)} className="bg-blue-500 overflow-auto w-fit rounded pl-1 pr-1 mb-3">
            Click Here to Run
          </button>
        </div>

        <div className="flex justify-center items-center">
            <div className="h-fit">
                <div className="text-blue-300 bg-gray-500 mb-5 rounded w-fit px-2">
                    Use the arrows to put in negative values
                </div>
                <table className="max-w-full bg-gray-700 border-2 border-black pl-1 pr-1">
                    <thead>
                    <tr>
                        <th className="w-[4vw] border-1 border-black px-1">Mass</th>
                        <th className="w-[4vw] border-1 border-black px-1">X-Pos</th>
                        <th className="w-[4vw] border-1 border-black px-1">Y-Pos</th>
                        <th className="w-[4vw] border-1 border-black px-1">Z-Pos</th>
                        <th className="w-[4vw] border-1 border-black px-1">X-Vel</th>
                        <th className="w-[4vw] border-1 border-black px-1">Y-Vel</th>
                        <th className="w-[4vw] border-1 border-black px-1">Z-Vel</th>
                        <th className="w-[4vw] border-1 border-black px-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {planets.map((planet, i) => (
                        <tr key={i}>
                        <td><input className="w-[4vw] border-1 border-black px-1" type="number" value={planet.mass} onChange={(e) => handleChange(i, 'mass', +e.target.value)} /></td>
                        {(['x', 'y', 'z'] as const).map(axis => (
                            <td key={`pos-${axis}`}>
                            <input className="w-[4vw] border-1 border-black px-1" type="number" value={planet.position[axis]} onChange={(e) => handlePositionChange(i, axis, +e.target.value)} />
                            </td>
                        ))}
                        {(['x', 'y', 'z'] as const).map(axis => (
                            <td key={`vel-${axis}`}>
                            <input className="w-[4vw] border-1 border-black px-1" type="number" value={planet.velocity[axis]} onChange={(e) => handleVelocityChange(i, axis, +e.target.value)} />
                            </td>
                        ))}
                        <td>
                            <button className="bg-red-500 text-white border-1 border-black px-1" onClick={() => handleDelete(i)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button
                    className="mt-2 bg-green-500 text-white p-1 rounded"
                    onClick={() =>
                    setPlanets((prev) => [...prev, {
                        mass: 100,
                        position: new THREE.Vector3(0, 0, 0),
                        velocity: new THREE.Vector3(0, 0, 0),
                    }])
                    }
                >
                    Add Planet
                </button>
            </div>
        </div>

        <div className="flex justify-center content-center bg-black">
          {isOn && (
            <Canvas style={{ height: '50vh', width: '100%', background: 'black' }}>
              <ambientLight intensity={Math.PI / 2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={Math.PI} />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <Planets color="#ff0000" initialPlanets={planets} />
            </Canvas>
          )}
        </div>
      </div>
    </div>
  );
}

type PlanetProps = {
  color?: string;
  initialPlanets: {
    mass: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
  }[];
} & ThreeElements['group'];

export function Planets({ color, initialPlanets, ...props }: PlanetProps) {
  const G = 6.6743e-2;
  const planetRefs = useRef<THREE.Mesh[]>([]);
  const planetsRef = useRef(
    initialPlanets.map(p => ({
      ...p,
      position: p.position.clone(),
      velocity: p.velocity.clone(),
    }))
  );

  useFrame((_, delta) => {
    const planets = planetsRef.current;

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const pi = planets[i];
        const pj = planets[j];

        const rVec = new THREE.Vector3().subVectors(pj.position, pi.position);
        const distSq = Math.max(rVec.lengthSq(), 1e-6);
        const forceMag = (G * pi.mass * pj.mass) / distSq;

        const a_i = rVec.clone().setLength(forceMag / pi.mass);
        const a_j = rVec.clone().setLength(-forceMag / pj.mass);

        pi.velocity.addScaledVector(a_i, delta);
        pj.velocity.addScaledVector(a_j, delta);
      }
    }

    planets.forEach((planet, i) => {
      planet.position.addScaledVector(planet.velocity, delta);
      planetRefs.current[i]?.position.copy(planet.position);
    });
  });

  return (
    <group {...props}>
      {planetsRef.current.map((planet, i) => (
        <mesh
          key={i}
          ref={(el) => el && (planetRefs.current[i] = el)}
          position={planet.position}
          scale={0.25}
        >
          <sphereGeometry args={[1, 32]} />
          <meshStandardMaterial color={i === 0 ? color : '#2f74c0'} />
        </mesh>
      ))}
    </group>
  );
}
