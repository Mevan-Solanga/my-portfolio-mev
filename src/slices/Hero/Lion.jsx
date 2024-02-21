"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { LionModel } from "../../../public/Scene";

export default function Lion() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-1"
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{
          position: [-55, 10, 120],
          zoom: 200,
        }}
      >
        <directionalLight
          position={[3.3, 1.0, 4.4]}
          castShadow
          intensity={Math.PI * 2}
        />

        <Float
          speed={3} // Animation speed, defaults to 1
          rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
          floatIntensity={1.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[0.75, 0.7]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <LionModel />
        </Float>
      </Canvas>
    </div>
  );
}
