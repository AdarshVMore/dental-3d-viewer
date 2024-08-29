import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { gsap } from "gsap";

// Ensure these paths are correct relative to your project
import objectPath from "../models/newPlane.obj";
import materialPath from "../models/newPlane.mtl";

const CameraController = ({ view }) => {
  const { camera } = useThree();
  const initialPositionRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let newPosition = { x: 0, y: 5, z: 10 }; // Default position
    let newRotation = { x: 0, y: 0, z: 0 }; // Default rotation

    switch (view) {
      case "Upper":
        newPosition = { x: 0, y: 12, z: 0 };
        newRotation = { x: -Math.PI / 2, y: 0, z: 0 };
        break;
      case "Top":
        newPosition = { x: 0, y: 8, z: 5 };
        newRotation = { x: -Math.PI / 2, y: 0, z: 0 };
        break;
      case "Right":
        newPosition = { x: 8, y: 0, z: 0 };
        newRotation = { x: 0, y: Math.PI / 2, z: 0 };
        break;
      case "Front":
        newPosition = { x: 0, y: 0, z: -10 };
        newRotation = { x: 0, y: 0, z: 0 };
        break;
      case "Left":
        newPosition = { x: -8, y: 0, z: 0 };
        newRotation = { x: 0, y: -Math.PI / 2, z: 0 };
        break;
      case "Bottom":
        newPosition = { x: 0, y: -8, z: 5 };
        newRotation = { x: 0, y: 0, z: Math.PI / 2 };
        break;
      case "Lower":
        newPosition = { x: 0, y: -12, z: 0 };
        newRotation = { x: Math.PI / 2, y: 0, z: 0 };
        break;
      default:
        newPosition = { x: 0, y: 5, z: 10 };
        newRotation = { x: 0, y: 0, z: 0 };
        break;
    }

    // Use GSAP to smoothly transition the camera position and rotation
    const tl = gsap.timeline();
    tl.to(camera.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 1, // Transition duration in seconds
      onUpdate: () => {
        camera.lookAt(0, 0, 0); // Ensure the camera is always looking at the origin
      },
    }).to(
      camera.rotation,
      {
        x: newRotation.x,
        y: newRotation.y,
        z: newRotation.z,
        duration: 1, // Transition duration for rotation
      },
      0
    ); // Starts at the same time as position animation

    // Store the initial position and rotation for reference if needed
    initialPositionRef.current = {
      position: newPosition,
      rotation: newRotation,
    };
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

const Viewer = ({ view, mode, background }) => {
  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 50 }} style={{ background }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model mode={mode} style={{ background }} />
      </Suspense>
      <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
      <CameraController view={view} />
    </Canvas>
  );
};

export default Viewer;
