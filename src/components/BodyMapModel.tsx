import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei';

function ModelContent() {
  const { scene } = useGLTF('/body-model.glb');
  const [activePart, setActivePart] = useState<string | null>(null);

  // Fix division by zero warnings in Three.js shaders by ensuring a minimum roughness
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat: any) => {
            let updated = false;
            // Make it glossy and metallic to match the reference
            if (mat.roughness !== undefined) {
              mat.roughness = 0.15;
              updated = true;
            }
            if (mat.metalness !== undefined) {
              mat.metalness = 0.85;
              updated = true;
            }
            if (updated) {
              mat.needsUpdate = true;
            }
          });
        }
      });
    }
  }, [scene]);

  // Helper function to create invisible hitboxes
  const Hitbox = ({ position, args, name, label }: any) => (
    <mesh 
      position={position} 
      onClick={(e) => {
        e.stopPropagation();
        setActivePart(name);
      }}
      onPointerMissed={() => setActivePart(null)}
    >
      <boxGeometry args={args} />
      <meshBasicMaterial 
        color={activePart === name ? "#ff0000" : "#00ff00"} 
        transparent 
        opacity={activePart === name ? 0.3 : 0.0} // 0.0 makes it invisible until clicked
        depthWrite={false}
      />
      {activePart === name && (
        <Html position={[0, 0, 0]} center>
          <div className="bg-black/90 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider whitespace-nowrap border border-primary-dim shadow-[0_0_10px_rgba(255,51,51,0.5)]">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );

  return (
    <group position={[0, -2.5, 0]} scale={4.5}>
      <primitive object={scene} />
      
      {/* 
        Adjust these positions and args based on your specific model's scale and proportions.
        These are rough estimates for a standard human model standing at origin.
      */}
      {/* Chest Hitbox */}
      <Hitbox position={[0, 1.4, 0.1]} args={[0.6, 0.4, 0.4]} name="chest" label="CHEST: 85% RECOVERED" />
      
      {/* Core/Abs Hitbox */}
      <Hitbox position={[0, 1.0, 0.1]} args={[0.5, 0.4, 0.4]} name="core" label="CORE: 100% READY" />
      
      {/* Left Arm Hitbox */}
      <Hitbox position={[0.5, 1.3, 0]} args={[0.3, 0.8, 0.3]} name="leftArm" label="L-ARM: SORE" />
      
      {/* Right Arm Hitbox */}
      <Hitbox position={[-0.5, 1.3, 0]} args={[0.3, 0.8, 0.3]} name="rightArm" label="R-ARM: SORE" />
      
      {/* Legs Hitbox */}
      <Hitbox position={[0, 0.4, 0]} args={[0.7, 0.8, 0.4]} name="legs" label="LEGS: FOCUS TODAY" />
    </group>
  );
}

function ModelLoader() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    // Check if the file exists and is not an HTML fallback
    fetch('/body-model.glb', { method: 'HEAD' })
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (!res.ok || (contentType && contentType.includes('text/html'))) {
          setStatus('error');
        } else {
          setStatus('success');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') {
    return (
      <Html center>
        <div className="text-white text-xs whitespace-nowrap opacity-50">
          Checking 3D Model...
        </div>
      </Html>
    );
  }

  if (status === 'error') {
    return (
      <Html center>
        <div className="bg-black/80 border border-red-500/50 p-4 rounded-xl text-center w-64">
          <p className="text-white text-xs opacity-90 mb-2">
            Model not found or failed to load.
          </p>
          <p className="text-primary-dim text-[10px] uppercase tracking-wider">
            Please ensure the 3D model is uploaded to the public folder.
          </p>
        </div>
      </Html>
    );
  }

  return <ModelContent />;
}

export default function BodyMapCanvas() {
  return (
    <div className="w-full h-full relative cursor-pointer">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        {/* Main front light, very subtle */}
        <directionalLight position={[0, 5, 5]} intensity={0.7} color="#ffffff" />
        {/* Strong rim lights from behind/sides to highlight the edges */}
        <spotLight position={[-5, 5, -5]} intensity={3} color="#ff4400" penumbra={1} distance={20} />
        <spotLight position={[5, 5, -5]} intensity={3} color="#ff4400" penumbra={1} distance={20} />
        {/* Subtle fill light from below */}
        <pointLight position={[0, -5, 2]} intensity={0.8} color="#4444ff" />
        
        {/* Use a darker environment map with low intensity */}
        <Environment preset="city" environmentIntensity={0.3} />
        
        <Suspense fallback={
          <Html center>
            <div className="text-white text-xs whitespace-nowrap opacity-50">
              Loading 3D Model...
            </div>
          </Html>
        }>
          <ModelLoader />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase text-white/50 pointer-events-none bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
        Tap body parts
      </div>
    </div>
  );
}
