import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'
import gspop from './getSpecificPercentOfProgress'


function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    useEffect(() => {
        const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    return size
}

function useLayerImages(layers) {
    const [map, setMap] = useState({})
    useEffect(() => {
        let cancelled = false
        const listeners = []
        layers.forEach((layer) => {
            if (!layer?.key || !layer?.src) return
            const image = new window.Image()
            image.crossOrigin = 'anonymous'
            image.src = layer.src
            const onLoad = () => {
                if (cancelled) return
                setMap((prev) => (prev[layer.key] === image ? prev : { ...prev, [layer.key]: image }))
            }
            image.addEventListener('load', onLoad)
            listeners.push([image, onLoad])
        })
        return () => {
            cancelled = true
            listeners.forEach(([img, cb]) => img.removeEventListener('load', cb))
        }
    }, [layers])
    return map
}

export default function ParallaxCanvas({ blur = 0, position = 1, scale = 1, opacity = 1, LAYERS = [], shift = .5, blink = 0 }) {
    const { width, height } = useWindowSize()
    const images = useLayerImages(LAYERS)

    const aspect = width / Math.max(1, height)
    const portraitMode = aspect <= (3 / 2) // <= 1.5


    const targetMouse = useRef({ x: 0, y: 0 })
    const currentMouse = useRef({ x: 0, y: 0 })
    const rafRef = useRef(0)

    useEffect(() => {
        const onMove = (e) => {
            const x = e.clientX / Math.max(1, width)
            const y = e.clientY / Math.max(1, height)
            targetMouse.current = { x: (x - 0.5) * 2, y: (y - 0.5) * 2 }
        }
        const onLeave = () => { targetMouse.current = { x: 0, y: 0 } }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
        }
    }, [width, height])

    const [, setTick] = useState(0)
    const active = opacity > 0.001
    useEffect(() => {
        if (!active) return;             // RAF только у активного
        const animate = () => {
            const lerp = (a, b, t) => a + (b - a) * t
            const t = 0.08
            currentMouse.current = {
                x: lerp(currentMouse.current.x, targetMouse.current.x, t),
                y: lerp(currentMouse.current.y, targetMouse.current.y, t),
            }
            setTick((n) => (n + 1) % 100000)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [active])
    const computeRect = (image, widthPercent, posXPercent, posYPercent) => {
        if (!image) return { x: 0, y: 0, width: 0, height: 0 }

        const cx = width / 2
        const cy = height / 2

        if (portraitMode) {
            const h = (height * widthPercent) / 100
            const s = h / image.height
            const w = image.width * s
            const x = cx - w / 2 + (posXPercent / 100) * (width / 2)
            const y = cy - h / 2 + (posYPercent / 100) * (height / 2)
            return { x, y, width: w, height: h }
        } else {
            const w = (width * widthPercent) / 100
            const s = w / image.width
            const h = image.height * s
            const x = cx - w / 2 + (posXPercent / 100) * (width / 2)
            const y = cy - h / 2 + (posYPercent / 100) * (height / 2)
            return { x, y, width: w, height: h }
        }
    }

    const rects = useMemo(() => {
        const entries = LAYERS.map((layer) => [
            layer.key,
            computeRect(images[layer.key], layer.widthPercent, layer.posXPercent, layer.posYPercent),
        ])
        return Object.fromEntries(entries)
    }, [images, width, height, portraitMode])

    const clamp01 = (v) => Math.max(0, Math.min(1, v))
    const p = clamp01(position)

    const gainUp = 0.2 + 0.8 * p
    const gainDown = 1.0 - 0.8 * p
    const smoothstep = (t) => t * t * (3 - 2 * t)
    const yStrength = (y) => {
        const dir = Math.max(-1, Math.min(1, y))
        const blend = 0.5 + 0.5 * dir
        const eased = smoothstep(blend)
        return gainUp * (1 - eased) + gainDown * eased
    }

    const posY = 2 * p - 1
    const scrollY = -posY // man ↑, bg ↓

    // безопасный горизонтальный сдвиг для портретного режима
    const POS_SAFETY = 0.9
    const posX = (-1 + 2 * p) * POS_SAFETY // -0.9..0.9
    const GLOBAL_SHIFT_FACTOR = shift / (aspect)    // ~4% ширины
    const globalShiftX = portraitMode ? posX * (width * GLOBAL_SHIFT_FACTOR) : 0

    const getRandom = (key, axis, levitate = 10, speed = 1) => {
        const t = performance.now() / (1000 / speed)
        const base = key.charCodeAt(0) + axis.charCodeAt(0)
        return Math.sin(t + base) * levitate
    }

    const getX = (layer, invert) => {
        const randomLevitate = getRandom(layer.key, 'x', layer.levitate, layer.speed)

        if (portraitMode) {
            const srcX = currentMouse.current.x + posX
            const delta = srcX * layer.ampX
            return (invert ? -delta : delta) + randomLevitate
        } else {
            const dir = invert ? -1 : 1
            return dir * currentMouse.current.x * layer.ampX + randomLevitate
        }
    }

    const getY = (layer, invert) => {
        const randomLevitate = getRandom(layer.key, 'y', layer.levitate, layer.speed)

        if (portraitMode) {
            const srcY = currentMouse.current.y
            const delta = srcY * layer.ampY * yStrength(srcY)
            return (invert ? -delta : delta) + randomLevitate
        } else {
            const srcY = currentMouse.current.y + scrollY
            const delta = srcY * layer.ampY * yStrength(srcY)
            return (invert ? -delta : delta) + randomLevitate
        }
    }

    const offsets = Object.fromEntries(
        LAYERS.map((layer) => [
            layer.key,
            { x: getX(layer, !!layer.inverX), y: getY(layer, !!layer.inverY) },
        ])
    )

    const applyScaleToRect = (rect, s) => {
        if (!rect) return rect
        const sx = Math.max(0.1, s)
        if (sx === 1) return rect
        const cx = width / 2
        const cy = height / 2
        const x = cx + (rect.x - cx) * sx
        const y = cy + (rect.y - cy) * sx
        return { x, y, width: rect.width * sx, height: rect.height * sx }
    }

    // if (opacity === 0) return null

    return (
        <div
            className="ParallaxCanvas"
            style={{
                willChange: 'transform',
                willChange: 'opacity, transform',
                opacity,
                pointerEvents: 'none',
                contain: 'layout paint size',
            }}
        >
            {(() => {
                const firstAnimIndex = LAYERS.findIndex((l) => !!l.animated)
                const before =
                    firstAnimIndex === -1 ? LAYERS.filter((l) => !l.animated) : LAYERS.slice(0, firstAnimIndex).filter((l) => !l.animated)
                const after =
                    firstAnimIndex === -1 ? [] : LAYERS.slice(firstAnimIndex + 1).filter((l) => !l.animated)
                const anims = LAYERS.filter((l) => !!l.animated)

                const out = []
                let z = 0

                const renderStage = (layers, key) => (
                    <Stage
                        key={key}
                        width={width}
                        height={height}
                        listening={false}
                        style={{ position: 'absolute', left: 0, top: 0, zIndex: z }}
                        visible={opacity !== 0}
                    >
                        <PerfLayer
                            x={width / 2}
                            y={height / 2}
                            offsetX={width / 2}
                            offsetY={height / 2}
                            scaleX={Math.max(0.1, scale)}
                            scaleY={Math.max(0.1, scale)}
                        >
                            {layers.map((layer) => {
                                const img = images[layer.key]
                                if (!img) return null
                                const r = rects[layer.key]
                                const o = offsets[layer.key]
                                const addX = portraitMode ? globalShiftX : 0 // ← глобальный X-сдвиг ДЛЯ КАЖДОЙ КАРТИНКИ
                                return (
                                    <KonvaImage
                                        key={layer.key}
                                        image={img}
                                        x={r.x + o.x + addX}
                                        y={r.y + o.y}
                                        width={r.width}
                                        height={r.height}
                                        opacity={
                                            layer.key === 'miniBlink'
                                                ? gspop(blink, 0, .9)
                                                : layer.key === 'blink'
                                                    ? gspop(blink, .9, 1)
                                                    : layer.key === 'blinkMeme'
                                                        ? gspop(blink, .99, 1.02)
                                                        : 1
                                        }
                                    />
                                )
                            })}
                        </PerfLayer>
                    </Stage>
                )

                if (before.length) {
                    out.push(renderStage(before, 'stage-before'))
                    z += 1
                }
                if (opacity !== 0) {

                    anims.forEach((layer) => {
                        const img = images[layer.key]
                        if (!img) return
                        const base = rects[layer.key]
                        const o = offsets[layer.key]
                        const pre = {
                            x: base.x + o.x + (portraitMode ? globalShiftX : 0), // ← сдвиг для IMG
                            y: base.y + o.y,
                            width: base.width,
                            height: base.height
                        }
                        const r = applyScaleToRect(pre, scale)
                        out.push(
                            <img
                                key={`anim-${layer.key}`}
                                src={layer.src}
                                alt={layer.key}
                                style={{
                                    position: 'absolute',
                                    left: `${r.x}px`,
                                    top: `${r.y}px`,
                                    width: `${r.width}px`,
                                    height: `${r.height}px`,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                    zIndex: z,
                                }}
                            />
                        )
                        z += 1
                    })
                }

                if (after.length) {
                    out.push(renderStage(after, 'stage-after'))
                    z += 1
                }

                return out
            })()}
        </div>
    )
}



const DPR_TARGET = Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 1.5);

function PerfLayer({ children, ...props }) {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const apply = () => {
            const l = ref.current;
            if (!l) return;
            l.getCanvas().setPixelRatio(DPR_TARGET);
            const hit = l.getHitCanvas?.();
            if (hit) hit.setPixelRatio(1);
            l.batchDraw();
        };
        apply();
        window.addEventListener('resize', apply);
        return () => window.removeEventListener('resize', apply);
    }, []);
    return (
        <Layer
            ref={ref}
            listening={false}
            hitGraphEnabled={false}
            perfectDrawEnabled={false}
            {...props}
        >
            {children}
        </Layer>
    );
}