// LogoMaskFill.jsx
import { useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect, Group, Path } from "react-konva";
import { LOGO_PATHS, LOGO_VIEWBOX } from "./svgPaths";
import gspop from "../getSpecificPercentOfProgress";
import screenSizeStore from "../stores/screenSizeStore";

export default function LogoMaskFill({
    wPercent = 30, // ширина логотипа в % от ширины экрана
    cx = 0,        // X в % от центра
    cy = 0,        // Y в % от центра
    progress = 0,  // 0..1 — 0 = дырка, 1 = белая фигура
}) {
    const [size, setSize] = useState(() => ({
        w: typeof window !== "undefined" ? window.innerWidth : 0,
        h: typeof window !== "undefined" ? window.innerHeight : 0,
    }));

    useEffect(() => {
        const onResize = () => setSize({ w: window.innerWidth, h: screenSizeStore.maxScreenHeight });
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const { scaleX, scaleY, x, y } = useMemo(() => {
        const stageW = size.w, stageH = size.h;

        // переводим проценты в пиксели
        const targetW = (wPercent / 100) * stageW;
        const targetH = (targetW * LOGO_VIEWBOX.h) / LOGO_VIEWBOX.w;

        const offsetX = (cx / 100) * (stageW / 2);
        const offsetY = (cy / 100) * (stageH / 2);

        return {
            scaleX: targetW / LOGO_VIEWBOX.w,
            scaleY: targetH / LOGO_VIEWBOX.h,
            x: stageW / 2 - targetW / 2 + offsetX,
            y: stageH / 2 - targetH / 2 + offsetY,
        };
    }, [size.w, size.h, wPercent, cx, cy]);

    return (
        <Stage width={size.w} height={size.h}>
            <Layer>
                {/* чёрный фон */}
                <Rect x={0} y={0} width={size.w} height={size.h} fill="black"
                    opacity={gspop(progress, 0, 0.1)}
                />

                {/* дырка */}
                <Group x={x} y={y} scaleX={scaleX} scaleY={scaleY}>
                    {LOGO_PATHS.map((d, i) => (
                        <Path
                            key={`cut-${i}`}
                            data={d}
                            fill="white"
                            opacity={1 - progress}
                            globalCompositeOperation="destination-out"
                        />
                    ))}
                </Group>

                {/* белый логотип */}
                <Group x={x} y={y} scaleX={scaleX} scaleY={scaleY}>
                    {LOGO_PATHS.map((d, i) => (
                        <Path
                            key={`fill-${i}`}
                            data={d}
                            fill="white"
                            opacity={progress}
                        />
                    ))}
                </Group>
            </Layer>
        </Stage>
    );
}
