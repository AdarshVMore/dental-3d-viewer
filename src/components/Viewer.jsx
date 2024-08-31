import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { gsap } from "gsap";

// Ensure these paths are correct relative to your project
import objectPath from "../models/Mandibular.obj";
import materialPath from "../models/Mandibular.obj.mtl";
import objectPath1 from "../models/Maxillary.obj";
import materialPath1 from "../models/Maxillary.obj.mtl";

// Utility function to handle material and object loading
const useModelLoader = (objPath, mtlPath) => {
  const materials = useLoader(MTLLoader, mtlPath);
  useEffect(() => {
    materials.preload();
  }, [materials]);

  const object = useLoader(OBJLoader, objPath, (loader) => {
    loader.setMaterials(materials);
  });

  return object;
};

const CameraController = React.memo(({ view, setUpperLower }) => {
  const { camera } = useThree();
  const initialPositionRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (typeof setUpperLower !== "function") {
      console.error("setUpperLower is not a function");
      return;
    }

    let newPosition = { x: 0, y: 5, z: 10 }; // Default position
    let newRotation = { x: 0, y: 0, z: 0 }; // Default rotation
    let upperLowerState = "both"; // Default upperLower state

    switch (view) {
      case "Upper":
        upperLowerState = "upper";
        newPosition = { x: 0, y: -12, z: 0 };
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
        newPosition = { x: 0, y: 0, z: 10 };
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
        upperLowerState = "lower";
        newPosition = { x: 0, y: 12, z: 0 };
        newRotation = { x: Math.PI / 2, y: 0, z: 0 };
        break;
      default:
        break;
    }

    setUpperLower(upperLowerState);

    // Use GSAP to smoothly transition the camera position and rotation
    gsap
      .timeline()
      .to(camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 1,
        onUpdate: () => camera.lookAt(0, 0, 0),
      })
      .to(
        camera.rotation,
        {
          x: newRotation.x,
          y: newRotation.y,
          z: newRotation.z,
          duration: 1,
        },
        0
      );

    initialPositionRef.current = {
      position: newPosition,
      rotation: newRotation,
    };
  }, [view, camera, setUpperLower]);

  return null;
});

const Model = React.memo(({ upperLower }) => {
  const mandibularObject = useModelLoader(objectPath, materialPath);
  const maxillaryObject = useModelLoader(objectPath1, materialPath1);

  return (
    <>
      {(upperLower === "lower" || upperLower === "both") && (
        <primitive object={mandibularObject} scale={0.1} />
      )}
      {(upperLower === "upper" || upperLower === "both") && (
        <primitive object={maxillaryObject} scale={0.1} />
      )}
    </>
  );
});

const Viewer = ({ view, mode, background }) => {
  const [upperLower, setUpperLower] = useState("both");

  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 50 }} style={{ background }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
      <Suspense fallback={<Text>Loading...</Text>}>
        <Model mode={mode} upperLower={upperLower} />
      </Suspense>
      <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
      <CameraController view={view} setUpperLower={setUpperLower} />
    </Canvas>
  );
};

export default Viewer;
