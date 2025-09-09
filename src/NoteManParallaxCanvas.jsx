import { useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'



const LAYERS = [
    { key: 'bg', src: '/noteMan/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
    { key: 'bilbords', src: '/noteMan/bilbords.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true, animated: true },
    { key: 'man', src: '/noteMan/man.webp', widthPercent: 105, posXPercent: 0, posYPercent: 10, ampX: 40, ampY: 40, speed: 0, levitate: 0, inverX: false, inverY: false },
]


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

export default function ParallaxCanvas({ blur = 0, position = 1, scale = 1, opacity = 1 }) {
    const { width, height } = useWindowSize()


    const images = useLayerImages(LAYERS)

    // Mouse normalized target (-1..1 both axes)
    const targetMouse = useRef({ x: 0, y: 0 })
    const currentMouse = useRef({ x: 0, y: 0 })
    const rafRef = useRef(0)

    useEffect(() => {
        const onMove = (e) => {
            const x = e.clientX / Math.max(1, width)
            const y = e.clientY / Math.max(1, height)
            // normalize to -1..1 from center
            targetMouse.current = { x: (x - 0.5) * 2, y: (y - 0.5) * 2 }
        }
        const onLeave = () => {
            targetMouse.current = { x: 0, y: 0 }
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
        }
    }, [width, height])

    // Smooth follow to target mouse using rAF
    const [, setTick] = useState(0)
    useEffect(() => {
        const animate = () => {
            const lerp = (a, b, t) => a + (b - a) * t
            const t = 0.08 // smoothing factor
            currentMouse.current = {
                x: lerp(currentMouse.current.x, targetMouse.current.x, t),
                y: lerp(currentMouse.current.y, targetMouse.current.y, t)
            }
            // trigger render
            setTick((n) => (n + 1) % 100000)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    // Compute rect: width as % of canvas width; pos in % from center
    const computeRect = (image, widthPercent, posXPercent, posYPercent) => {
        if (!image) return { x: 0, y: 0, width: 0, height: 0 }
        const w = (width * widthPercent) / 100
        const scale = w / image.width
        const h = image.height * scale
        const cx = width / 2
        const cy = height / 2
        const x = cx - w / 2 + (posXPercent / 100) * (width / 2)
        const y = cy - h / 2 + (posYPercent / 100) * (height / 2)
        return { x, y, width: w, height: h }
    }
    // Build rects keyed by layer name (not index) for flexibility
    const rects = useMemo(() => {
        const entries = LAYERS.map((layer) => [
            layer.key,
            computeRect(
                images[layer.key],
                layer.widthPercent,
                layer.posXPercent,
                layer.posYPercent
            ),
        ])
        return Object.fromEntries(entries)
    }, [images, width, height])

    // Clamp position and compute smooth directional strength for Y
    const clamp01 = (v) => Math.max(0, Math.min(1, v))
    const p = clamp01(position)
    const gainUp = 0.2 + 0.8 * p      // when moving up (y < 0)
    const gainDown = 1.0 - 0.8 * p    // when moving down (y >= 0)
    const smoothstep = (t) => t * t * (3 - 2 * t)
    const yStrength = (y) => {
        const dir = Math.max(-1, Math.min(1, y)) // -1..1
        const blend = 0.5 + 0.5 * dir            // 0 (up) .. 1 (down)
        const eased = smoothstep(blend)          // smooth transition
        return gainUp * (1 - eased) + gainDown * eased
    }
    // bias: -1 at p=0 (max up), +1 at p=1 (max down)
    const bias = p * 2 - 1

    const getRandom = (key, axis, levitate = 10, speed = 1) => {
        const t = performance.now() / (1000 / speed);
        const base = key.charCodeAt(0) + axis.charCodeAt(0);
        return Math.sin(t + base) * levitate;
    };

    const getX = (layer, invert) => {
        const randomLevitate = getRandom(layer.key, 'x', layer.levitate, layer.speed);
        const dir = invert ? -1 : 1;
        return dir * currentMouse.current.x * layer.ampX + randomLevitate;
    };

    const getY = (layer, invert) => {
        const randomLevitate = getRandom(layer.key, 'y', layer.levitate, layer.speed);
        const base = bias * layer.ampY;
        const delta = currentMouse.current.y * layer.ampY * yStrength(currentMouse.current.y);
        return (invert ? base - delta : base + delta) + randomLevitate;
    };

    // Parallax offsets per layer (invert bg for subtle counter-parallax)
    const offsets = Object.fromEntries(
        LAYERS.map((layer) => [
            layer.key,
            { x: getX(layer, !!layer.inverX), y: getY(layer, !!layer.inverY) },
        ])
    )

    // Render non-animated layers via Konva; animated ones as DOM <img> overlays
    const nonAnimated = useMemo(() => LAYERS.filter((l) => !l.animated), [])
    const animated = useMemo(() => LAYERS.filter((l) => !!l.animated), [])

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
    if (opacity === 0) return



    return (


        <div className='ParallaxCanvas' style={{ filter: blur ? `blur(${blur}px)` : 'none' }}>
            {(() => {
                // Split into: non-animated before first animated, animated, non-animated after.
                const firstAnimIndex = LAYERS.findIndex((l) => !!l.animated)
                const before = firstAnimIndex === -1
                    ? LAYERS.filter((l) => !l.animated)
                    : LAYERS.slice(0, firstAnimIndex).filter((l) => !l.animated)
                const after = firstAnimIndex === -1
                    ? []
                    : LAYERS.slice(firstAnimIndex + 1).filter((l) => !l.animated)
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
                    >
                        <Layer
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
                                return (
                                    <KonvaImage
                                        key={layer.key}
                                        image={img}
                                        x={r.x + o.x}
                                        y={r.y + o.y}
                                        width={r.width}
                                        height={r.height}
                                    />
                                )
                            })}
                        </Layer>
                    </Stage>
                )

                if (before.length) {
                    out.push(renderStage(before, 'stage-before'))
                    z += 1
                }
                anims.forEach((layer) => {
                    const img = images[layer.key]
                    if (!img) return
                    const base = rects[layer.key]
                    const o = offsets[layer.key]
                    const pre = { x: base.x + o.x, y: base.y + o.y, width: base.width, height: base.height }
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
                if (after.length) {
                    out.push(renderStage(after, 'stage-after'))
                    z += 1
                }

                return out
            })()}
        </div >
    )
}
