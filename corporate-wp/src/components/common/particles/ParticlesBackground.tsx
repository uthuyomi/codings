"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { particlesOptions } from "@/lib/particlesOptions";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine as Engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default ParticlesBackground;
