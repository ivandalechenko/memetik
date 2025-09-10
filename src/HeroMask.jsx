import { useLayoutEffect, useRef, useMemo } from "react";
import createBezier from "./createBezier";
import HeroMaskPaths from "./HeroMaskPaths";
import gspop from "./getSpecificPercentOfProgress";

const MAX_SCALE = 160;
const scaleCubic = createBezier(0, 0.65, 0, 1);

export default function HeroMask({ totalProgress, from, to }) {
    const maskRef = useRef(null);
    const imgRef = useRef(null);
    const rafRef = useRef(0);
    const baseYRef = useRef(0);

    // callback-refs (чтобы не было ошибки ref)
    const setMaskEl = (el) => {
        maskRef.current = el;
        if (el && !baseYRef.current) {
            try {
                baseYRef.current = el.getBBox().height || 376;
            } catch {
                baseYRef.current = 376;
            }
        }
    };
    const setImgEl = (el) => (imgRef.current = el);

    const scaleAdj = useMemo(() => 1 - 1.01 / MAX_SCALE, []);
    const baseYMemo = useMemo(() => baseYRef.current || 376, [baseYRef.current]);

    useLayoutEffect(() => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;

            const p0 = gspop(totalProgress, from, to);
            const p = p0 < 0 ? 0 : p0 > 1 ? 1 : p0;

            const cubic = scaleCubic(p);
            const scale = MAX_SCALE * (1 - cubic * scaleAdj);
            const y = (baseYRef.current || baseYMemo) * (1 - cubic);
            const opacity = p <= 0.5 ? 0 : (p - 0.5) * 2;

            const transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
            if (maskRef.current) maskRef.current.style.transform = transform;
            if (imgRef.current) {
                imgRef.current.style.transform = transform;
                imgRef.current.style.opacity = String(opacity);
            }
        });
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        };
    }, [totalProgress, from, to, scaleAdj, baseYMemo]);

    return (
        <div className="HeroMask free_img">
            <svg viewBox="0 0 1021 546" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask id="cutMask">
                        <rect width="1021" height="546" fill="white" />
                        <g
                            ref={setMaskEl}
                            fill="black"
                            style={{
                                transformBox: "fill-box",
                                transformOrigin: "bottom",
                                willChange: "transform",
                            }}
                        >
                            <HeroMaskPaths pathNum={1} />
                        </g>
                    </mask>
                </defs>

                <g
                    ref={setImgEl}
                    style={{
                        transformBox: "fill-box",
                        transformOrigin: "bottom",
                        willChange: "transform, opacity",
                    }}
                >
                    <HeroMaskPaths pathNum={2} />
                </g>

                <rect width="1021" height="546" fill="#0E0C11" mask="url(#cutMask)" />
            </svg>
        </div>
    );
}
