// src/lib/particlesOptions.ts

export const particlesOptions = {
  background: { color: { value: "#1E2A38" } },
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 60 },
    color: { value: "#00f0ff" },
    links: {
      enable: true,
      distance: 150,
      color: "#00f0ff",
      opacity: 0.3,
      width: 1,
    },
    move: { enable: true, speed: 0.6 },
    shape: { type: "circle" },
    size: { value: 2 },
    opacity: { value: 0.5 },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: {
        distance: 140,
        links: { opacity: 0.5 },
      },
    },
  },
};
