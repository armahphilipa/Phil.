
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Fix for JSX intrinsic element errors where lowercase Three.js tags are not recognized by the TypeScript environment
const PointsElement = 'points' as any;
const BufferGeometryElement = 'bufferGeometry' as any;
const BufferAttributeElement = 'bufferAttribute' as any;
const PointsMaterialElement = 'pointsMaterial' as any;
const ColorElement = 'color' as any;
const AmbientLightElement = 'ambientLight' as any;

// Helper to check for WebGL support
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const Points = ({ count = 2500 }) => {
  const meshRef = useRef<any>(null);
  const { viewport, mouse } = useThree();

  // Create initial positions and store them as a reference to return to
  const initialPositions = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 40;     // x
      temp[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    return temp;
  }, [count]);

  // Current positions that will be animated
  const currentPositions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);
  
  // Temporary vectors for calculations (optimization to avoid GC)
  const particlePos = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const mousePos = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;
    
    // Update mouse position in 3D space based on normalized cursor coordinates
    mousePos.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get home/initial position
      const ix = initialPositions[i3];
      const iy = initialPositions[i3 + 1];
      const iz = initialPositions[i3 + 2];

      // Current position in the attribute
      particlePos.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      
      // Calculate distance to mouse
      const dist = particlePos.distanceTo(mousePos);
      const repelThreshold = 4;
      const repelForce = 0.5;
      const returnSpeed = 0.05;

      // Displacement from mouse
      if (dist < repelThreshold) {
        direction.subVectors(particlePos, mousePos).normalize();
        const force = (repelThreshold - dist) / repelThreshold;
        particlePos.add(direction.multiplyScalar(force * repelForce));
      }

      // Gently ease back to initial position + a bit of ambient "floating" motion
      targetPos.set(
        ix + Math.sin(time * 0.5 + ix) * 0.2,
        iy + Math.cos(time * 0.4 + iy) * 0.2,
        iz + Math.sin(time * 0.3 + iz) * 0.2
      );
      
      particlePos.lerp(targetPos, returnSpeed);

      // Write back to the array
      positions[i3] = particlePos.x;
      positions[i3 + 1] = particlePos.y;
      positions[i3 + 2] = particlePos.z;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Add subtle rotation to the whole group
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = time * 0.01;
  });

  return (
    <PointsElement ref={meshRef}>
      <BufferGeometryElement>
        <BufferAttributeElement
          attach="position"
          count={count}
          array={currentPositions}
          itemSize={3}
        />
      </BufferGeometryElement>
      <PointsMaterialElement
        size={0.08}
        color="#a855f7"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </PointsElement>
  );
};

// High-quality CSS fallback for when WebGL is unavailable
const CSSFallback = () => (
  <div className="absolute inset-0 bg-slate-950 overflow-hidden">
    <motion.div 
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[120px]"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[150px]"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, -40, 0],
        y: [0, -60, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
  </div>
);

const ParticleBackground = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-slate-950">
      {hasWebGL === true ? (
        <>
          <Canvas 
            camera={{ position: [0, 0, 15], fov: 75 }}
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
            onError={(e) => {
              console.warn("WebGL Context lost or failed, falling back to CSS background.");
              setHasWebGL(false);
            }}
          >
            <ColorElement attach="background" args={['#020617']} />
            <AmbientLightElement intensity={0.5} />
            <Points count={2000} />
          </Canvas>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-60" />
        </>
      ) : hasWebGL === false ? (
        <CSSFallback />
      ) : (
        // Initial state before check completes
        <div className="absolute inset-0 bg-slate-950" />
      )}
    </div>
  );
};

export default ParticleBackground;
