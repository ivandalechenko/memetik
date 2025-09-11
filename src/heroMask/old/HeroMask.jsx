import { useEffect, useRef, useMemo } from "react";
import createBezier from "../../createBezier";
import HeroMaskPaths from "./HeroMaskPaths";
import gspop from "../../getSpecificPercentOfProgress";

const MAX_SCALE = 160;
const BASE_Y = 10000;
const scaleCubic = createBezier(0, 0.65, 0, 1);

export default function HeroMask({ totalProgress, from, to }) {
    const maskRef = useRef(null);
    const imgRef = useRef(null);

    // rAF loop
    const rafRef = useRef(0);

    // latest props in refs (чтобы не терять апдейты во время частых ререндеров)
    const progRef = useRef(0);
    const fromRef = useRef(0);
    const toRef = useRef(1);

    const baseYRef = useRef(BASE_Y);
    const setMaskEl = (el) => (maskRef.current = el);
    const setImgEl = (el) => (imgRef.current = el);

    const scaleAdj = useMemo(() => 1 - 1.01 / MAX_SCALE, []);

    // обновляем значения без перезапуска rAF
    useEffect(() => {
        progRef.current = totalProgress;
        fromRef.current = from;
        toRef.current = to;
    }, [totalProgress, from, to]);

    useEffect(() => {
        let mounted = true;

        const tick = () => {
            if (!mounted) return;

            const p0 = gspop(progRef.current, fromRef.current, toRef.current);
            const p = p0 < 0 ? 0 : p0 > 1 ? 1 : p0;

            const cubic = scaleCubic(p);
            const scale = MAX_SCALE * (1 - cubic * scaleAdj);
            const y = baseYRef.current * (1 - cubic);
            const opacity = p <= 0.5 ? 0 : (p - 0.5) * 2;

            const transform = `translate3d(0, ${y}px, 0) scale(${scale})`;

            const maskEl = maskRef.current;
            const imgEl = imgRef.current;

            if (maskEl) maskEl.style.transform = transform;
            if (imgEl) {
                imgEl.style.transform = transform;
                imgEl.style.opacity = String(opacity);
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        // запускаем один бесконечный rAF-цикл (не отменяем на каждый апдейт пропсов)
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            mounted = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        };
    }, [scaleAdj]);

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
