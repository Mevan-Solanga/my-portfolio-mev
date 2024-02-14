"use client"

import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, Float } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function Shapes(){
    return(
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
           <Canvas 
            className="z-0" 
            shadows gl={{antialias:true}} 
            dpr={[1, 1.5]} 
            camera={{position: [0, 0, 25], fov: 30, near:1, far: 40}}
            >
                <Suspense fallback={null}>
                    <Geometries/>
                    <ContactShadows //gives shadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}
                     />
                    <Environment preset="sunset" />
                </Suspense> 
            </Canvas> 
        </div>
    );
}

function Geometries(){
    const geometries = [
        {
            position: [0, 0, 0], //position the gem will be in
            r: .3,//rate of rotation
            geometry: new THREE.IcosahedronGeometry(3), //Gem
        },
        {
            position: [1, -0.75, 4],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), //Pill
        },
        {
            position: [-1.4, 2, -4],
            r: 0.6,
            geometry: new THREE.DodecahedronGeometry(1.5), //Soccer Ball
        },
        {
            position: [-0.8, -0.75, 5],
            r: 0.5,
            geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), //Donut
        },
        {
            position: [1.6, 1.6, -4],
            r: 0.7,
            geometry: new THREE.OctahedronGeometry(1.5), //Diamond
        },
    ];

    const materials =[
        new THREE.MeshStandardMaterial({color: 0x222f3e, roughness: 0 }),
        new THREE.MeshStandardMaterial({color: 0xe84118, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({color: 0xe1b12c, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({color: 0x8c7ae6, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({color: 0x7f8fa6, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.5,
            color: 0xf0932b,
        }),
        new THREE.MeshStandardMaterial({
            roughness: 0.1,
            metalness: 0.5,
            color: 0xeb4d4b,
        }),

    ];

    //sound from the below folders
    const soundEffects = [
        new Audio("/sounds/knock1.ogg"),
        new Audio("/sounds/knock2.ogg"),
        new Audio("/sounds/knock3.ogg"),
    ];

    return geometries.map(({position, r, geometry})=>(
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p)=>p*2)}
            soundEffects ={soundEffects}
            geometry={geometry}
            materials={materials}
            r={r}
        />
    ));
}


function Geometry({r, position, geometry, materials, soundEffects}) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false); //set the intial state

    const startingMaterial = getRandomMaterial();

        function getRandomMaterial(){
            return gsap.utils.random(materials);
        }

        function handleCLick(e){
            const mesh = e.object;

            gsap.utils.random(soundEffects).play()

            gsap.to(mesh.rotation, {
                x: `+=${gsap.utils.random(0, 2)}`,
                y: `+=${gsap.utils.random(0, 2)}`,
                z: `+=${gsap.utils.random(0, 2)}`,
                duration: 1.3,
                ease: "elastic.out(1,0.3)",
                yoyo: true,
            });
            mesh.material = getRandomMaterial();
        }

        const handlePointerOver = () => {
            document.body.style.cursor = "pointer";
        };

        const handlePointerOut = () => {
            document.body.style.cursor = "default";
        };

        useEffect(()=>{
            let ctx = gsap.context(()=>{
                setVisible(true);
                gsap.from(meshRef.current.scale, {
                    x:0,
                    y:0,
                    z:0,
                    duration: 1,
                    ease: "elastic.out(1,0.3)", //check gsap
                    delay: 0.3,
                });
            });
            return () => ctx.revert();
        }, []);



        return (
            <group position={position} ref={meshRef}>
                <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 *r}> //uses the value of r(rate)
                    <mesh
                        geometry={geometry}
                        onClick={handleCLick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                        visible={visible}
                        material={startingMaterial}
                    />
                </Float> ///makes objets float
            </group>
        )

}
