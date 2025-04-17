"use client";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { useCustomizerControls } from "./context";
import { asImageSrc } from "@prismicio/client";
import { Skateboard } from "../components/SkateBoard";
import * as THREE from "three";

type Props = {
  wheelTextureURLs: string[];
  deckTextureURLs: string[];
};

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIROMENT_COLOR = "#3B3A3A";

export default function Preview({ wheelTextureURLs, deckTextureURLs }: Props) {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const { selectedWheel, selectedBolt, selectedDeck, selectedTruck } =
    useCustomizerControls();

  const wheelTextureURL =
    asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTextureURL =
    asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

  function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
    if (!cameraControls) return;

    cameraControls.current?.setTarget(target.x, target.y, target.z, true);
    cameraControls.current?.setPosition(pos.x, pos.y, pos.z, true);
  }
  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0)
    );
  }, [selectedDeck]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.08, 0.54, 0.64),
      new THREE.Vector3(0.09, 1, 0.9)
    );
  }, [selectedWheel]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.25, 0.3, 0.62),
      new THREE.Vector3(-0.5, 0.35, 0.8)
    );
  }, [selectedBolt]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.12, 0.29, 0.57),
      new THREE.Vector3(0.1, 0.25, 0.9)
    );
  }, [selectedTruck]);

  function onCameraControlStart() {
    if (
      !cameraControls.current ||
      !floorRef.current ||
      cameraControls.current.colliderMeshes.length > 0
    )
      return;

    cameraControls.current.colliderMeshes = [floorRef.current];
  }

  return (
    <Canvas shadows camera={{ position: [2.5, 1, 0], fov: 50 }}>
      <Suspense fallback={null}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach="fog" args={[ENVIROMENT_COLOR, 3, 10]} />
        <color attach="background" args={[ENVIROMENT_COLOR]} />
        <StageFloor />

        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={floorRef}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        <Skateboard
          wheelTextureURLs={wheelTextureURLs}
          wheelTextureURL={wheelTextureURL}
          deckTextureURLs={deckTextureURLs}
          deckTextureURL={deckTextureURL}
          truckColor={truckColor}
          boltColor={boltColor}
          pose="side"
        />
        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
          onStart={onCameraControlStart}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIROMENT_COLOR,
    normalMap: normalMap,
  });
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
