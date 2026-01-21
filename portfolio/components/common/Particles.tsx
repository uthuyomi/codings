"use client";

import { useEffect, useState, useMemo } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      background: {
        color: "#0b0e14",
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: isMobile ? 60 : 110,
          density: {
            enable: true,
            area: 900,
          },
        },
        color: {
          value: "#9da5b4",
        },
        opacity: {
          value: 0.6,
        },
        size: {
          value: { min: 1, max: 2 },
        },
        links: {
          enable: true,
          distance: 400,
          color: "#6b7280",
          opacity: 0.22,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          random: false,
          straight: false,
        },
      },
      detectRetina: true,
    }),
    [isMobile],
  );

  if (!ready) return null;

  return <Particles id="tsparticles" options={options} />;
}
