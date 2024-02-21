"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.3, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
