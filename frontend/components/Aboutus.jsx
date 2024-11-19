import image1 from './images/WhatsApp Image 2024-11-13 at 20.27.30.jpeg';
import image2 from './images/FEBDDC3A-A980-48AF-BB0F-73E3C98752C8_1_105_c.jpeg';
import image3 from './images/C3F705C2-5D3B-4880-A621-5BB61D739BE1_1_105_c.jpeg';


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import '@fontsource/quicksand';
import '@fontsource/comfortaa';

const AboutUs = () => {
  const navigate = useNavigate();
  const [hoveredMember, setHoveredMember] = useState(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, rgba(164, 215, 225, 0.8), rgba(255, 255, 255, 0.8))",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "6rem 2rem 2rem",
      fontFamily: 'Quicksand, sans-serif',
      position: 'relative',
      zIndex: 1,
    },
    canvas: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    },
    header: {
      textAlign: "center",
      marginBottom: "4rem",
      position: "relative",
    },
    heading: {
      fontSize: "3.5rem",
      fontWeight: "700",
      color: "#004D4D",
      marginBottom: "1.5rem",
      fontFamily: 'Comfortaa, cursive',
      textShadow: "0 0 10px rgba(164, 215, 225, 0.5)",
    },
    subheading: {
      fontSize: "1.25rem",
      color: "#475569",
      maxWidth: "42rem",
      margin: "0 auto",
    },
    teamContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "4rem",
      width: "100%",
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "2rem",
    },
    memberCard: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "1rem",
      padding: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(164, 215, 225, 0.3)",
      display: "flex",
      gap: "2rem",
      alignItems: "center",
    },
    memberName: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#004D4D",
      marginBottom: "1rem",
      fontFamily: 'Comfortaa, cursive',
    },
    memberDescription: {
      color: "#475569",
      fontSize: "1.1rem",
      lineHeight: "1.6",
      fontFamily: 'Quicksand, sans-serif',
    },
    memberImage: {
      width: "300px",
      height: "300px",
      objectFit: "cover",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    backButton: {
      marginTop: "3rem",
      backgroundColor: "#004D4D",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "0.75rem",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontFamily: 'Quicksand, sans-serif',
    },
    role: {
      color: "#A4D7E1",
      fontSize: "1rem",
      marginBottom: "0.5rem",
      fontFamily: 'Comfortaa, cursive',
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
  };

  const teamMembers = [
    {
      name: "Preetham R Sanji",
      role: "Windows User",
      description: "Currently Running MacOS on a windows",
      imageUrl: image1
    },
    {
      name: "Pratyush Sinha",
      role: "Mac User",
      description: "Currently Running Windows 95 on a mac.",
      imageUrl: image3
    },
    {
      name: "Prakhar Kumar",
      role: "Operating Systems User",
      description: "Currently Running Linux on a Windows 10 on a mac",
      imageUrl: image2
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 2.0;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          vec3 color = mix(vec3(0.1, 0.3, 0.3), vec3(0.3, 0.7, 0.7), vPosition.z * 0.5 + 0.5);
          gl_FragColor = vec4(color, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;

      particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
      particlesMesh.position.z = Math.sin(elapsedTime * 0.5) * 0.2;

      // Particle animation
      const positions = particlesMesh.geometry.attributes.position.array;
      for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.5) * 0.0005;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      composer.render();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={styles.canvas} />
      <motion.div
        ref={containerRef}
        style={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          style={styles.header}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2
          }}
        >
          <motion.h1 
            style={styles.heading}
            animate={{
              scale: [1, 1.02, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            {"<Team.Future />"}
          </motion.h1>
          <motion.p 
            style={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Coding tomorrow's solutions, today
          </motion.p>
        </motion.div>

        <motion.div style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              style={styles.memberCard}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredMember(index)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <motion.img
                src={member.imageUrl}
                alt={member.name}
                style={styles.memberImage}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div>
                <motion.div 
                  style={styles.role}
                  animate={{
                    color: hoveredMember === index ? "#004D4D" : "#A4D7E1"
                  }}
                >
                  {member.role}
                </motion.div>
                <motion.h2 
                  style={styles.memberName}
                  animate={{
                    scale: hoveredMember === index ? 1.05 : 1
                  }}
                >
                  {member.name}
                </motion.h2>
                <motion.p style={styles.memberDescription}>
                  {member.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#003333",
            boxShadow: "0 0 15px rgba(164, 215, 225, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Dashboard
        </motion.button>
      </motion.div>
    </>
  );
};

export default AboutUs;