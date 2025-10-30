'use client';
import React, { useEffect, useRef } from 'react';

export default function Starfield(){
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!;
    let w = c.width = innerWidth, h = c.height = innerHeight, id = 0;
    const onR = () => { w = c.width = innerWidth; h = c.height = innerHeight; init(); };
    addEventListener('resize', onR);

    type S = { x:number;y:number;z:number;r:number;tw:number };
    let s:S[] = []; const N = 240;
    function init(){ s = Array.from({length:N}, () => ({ x:Math.random()*w, y:Math.random()*h, z:Math.random()*.8+.2, r:Math.random()*1.6+.3, tw:Math.random()*6.28 })); }
    init();

    const draw = (t:number) => {
      x.clearRect(0,0,w,h);
      for(const a of s){
        const tw = (Math.sin(t*.002 + a.tw)+1)/2;
        x.beginPath(); x.arc(a.x, a.y, a.r*a.z, 0, 6.283);
        x.fillStyle = `rgba(255,255,255,${.55 + .45*tw*a.z})`; x.fill();
        a.x += .03 + .05*a.z; if(a.x > w+5) a.x = -5;
      }
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); removeEventListener('resize', onR); };
  }, []);

  return (
    <div className="starfield-wrap">
      <canvas ref={ref} className="block w-full h-full" />
      <div className="streaks" />
    </div>
  );
}
