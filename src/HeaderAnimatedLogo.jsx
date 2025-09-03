import { useEffect, useRef } from "react";

export default function Sprite({
    src = "/logoCubeAnim.webp",
    cols = 13,
    total = 151,
    size = 60,
    fps = 30
}) {
    const elRef = useRef(null);
    const frameRef = useRef(0);
    const rows = Math.ceil(total / cols);

    useEffect(() => {
        let rafId;
        let last = performance.now();
        const frameDur = 1000 / fps;


        const tick = (now) => {
            if (now - last >= frameDur) {
                last += frameDur;
                frameRef.current = (frameRef.current + 1) % total;
                const f = frameRef.current;
                const x = -((f % cols) * size);
                const y = -(Math.floor(f / cols) * size);
                if (elRef.current) elRef.current.style.backgroundPosition = `${x}px ${y}px`;
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [cols, total, size, fps]);

    return (
        <div
            ref={elRef}
            style={{
                width: size,
                height: size,
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${cols * size}px ${rows * size}px`,
                imageRendering: "pixelated", // по желанию
                willChange: "background-position"
            }}
        />
    );
}
