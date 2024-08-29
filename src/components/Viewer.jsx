import React, { Suspense, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber"; // Import useThree here
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

// Ensure these paths are correct relative to your project
import objectPath from "../models/newPlane.obj";
import materialPath from "../models/newPlane.mtl";

import { gsap } from "gsap";

const CameraController = ({ view }) => {
  const { camera } = useThree();

  useEffect(() => {
    let newPosition = { x: 0, y: 5, z: 10 }; // Default position

    switch (view) {
      case "Upper":
      case "Top":
        newPosition = { x: 0, y: 10, z: 0 };
        break;
      case "Right":
        newPosition = { x: 8, y: 0, z: 0 };
        break;
      case "Front":
        newPosition = { x: 0, y: 0, z: -10 };
        break;
      case "Left":
        newPosition = { x: -8, y: 0, z: 0 };
        break;
      case "Bottom":
        newPosition = { x: 0, y: -5, z: 0 };
        break;
      case "Lower":
        newPosition = { x: 0, y: -10, z: 0 };
        break;
      default:
        newPosition = { x: 0, y: 5, z: 10 };
        break;
    }

    // Use gsap to smoothly transition the camera position
    gsap.to(camera.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 1, // Transition duration in seconds
      onUpdate: () => camera.lookAt(0, 0, 0), // Ensure the camera is always looking at the origin
    });
  }, [view, camera]);

  return null; // No need to render anything
};

const Model = ({ mode }) => {
  const materials = useLoader(MTLLoader, materialPath);

  useEffect(() => {
    materials.preload();
  }, [materials]);

  const obj = useLoader(OBJLoader, objectPath, (loader) => {
    loader.setMaterials(materials);
  });

  if (!obj) return null;

  return <primitive object={obj} scale={1.5} />;
};

const Viewer = ({ view, mode }) => {
  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model mode={mode} />
      </Suspense>
      <OrbitControls />
      {/* CameraController needs to be inside Canvas */}
      <CameraController view={view} />
    </Canvas>
  );
};

export default Viewer;
