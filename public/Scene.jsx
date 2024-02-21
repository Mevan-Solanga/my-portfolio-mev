import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const LionModel = (...props) => {
  const { nodes, materials } = useGLTF("/scene-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.default_tex0}
        rotation={[-0.066, -0.597, -0.076]}
      />
    </group>
  );
};

useGLTF.preload("/scene-transformed.glb");
