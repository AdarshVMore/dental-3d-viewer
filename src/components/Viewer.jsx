import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import object from "../models/piper_pa18.dae"; // Ensure this path is correct
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Model = () => {
  // Load the .dae model using ColladaLoader from @react-three/fiber
  const { scene } = useLoader(ColladaLoader, object);
  console.log(scene);
  return <primitive object={scene} scale={0.02} />;
};

const Viewer = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Viewer;
