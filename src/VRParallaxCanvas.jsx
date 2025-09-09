import { useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'


const LAYERS = [
    { key: 'bg', src: '/vr/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 10, speed: 0, levitate: 0, inverX: true, inverY: true },
    { key: 'bonk', src: '/vr/bonk.webp', widthPercent: 70, posXPercent: 10, posYPercent: -10, ampX: 10, ampY: 5, speed: 0, levitate: 0, inverX: false, inverY: false },
    { key: 'sunday', src: '/vr/sunday.webp', widthPercent: 65, posXPercent: -10, posYPercent: 5, ampX: 20, ampY: 10, speed: .5, levitate: 5, inverX: false, inverY: false },
    { key: 'catfrog', src: '/vr/catfrog.webp', widthPercent: 70, posXPercent: 0, posYPercent: -10, ampX: 30, ampY: 15, speed: .8, levitate: 6, inverX: false, inverY: false },
    { key: 'hippo', src: '/vr/hippo.webp', widthPercent: 70, posXPercent: 0, posYPercent: -10, ampX: 40, ampY: 20, speed: 0.4, levitate: 7, inverX: false, inverY: false },
    { key: 'knut', src: '/vr/knut.webp', widthPercent: 80, posXPercent: 5, posYPercent: 10, ampX: 50, ampY: 25, speed: .6, levitate: 8, inverX: false, inverY: false },
    { key: 'char', src: '/vr/char.webp', widthPercent: 80, posXPercent: 0, posYPercent: 0, ampX: 60, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false },
    { key: 'fred', src: '/vr/fred.webp', widthPercent: 80, posXPercent: -25, posYPercent: 10, ampX: 70, ampY: 35, speed: 0.9, levitate: 10, inverX: false, inverY: false },
    { key: 'pnut', src: '/vr/pnut.webp', widthPercent: 70, posXPercent: -40, posYPercent: -20, ampX: 80, ampY: 40, speed: 0.7, levitate: 12, inverX: false, inverY: false },
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

function useHTMLImage(src) {
    const [img, setImg] = useState(null)
    useEffect(() => {
        if (!src) return
        const image = new window.Image()
        image.crossOrigin = 'anonymous'
        image.src = src
        const onLoad = () => setImg(image)
        image.addEventListener('load', onLoad)
        return () => image.removeEventListener('load', onLoad)
    }, [src])
    return img
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


    // TODO сделай чтобы тут не надо было указывать картинки и их пути, чтобы всё конфигурировалось из LAYERS
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

    if (opacity === 0) return
    return (
        <div className='ParallaxCanvas' style={{ filter: blur ? `blur(${blur}px)` : 'none' }}>
            <Stage width={width} height={height} listening={false}>
                <Layer
                    x={width / 2}
                    y={height / 2}
                    offsetX={width / 2}
                    offsetY={height / 2}
                    scaleX={Math.max(0.1, scale)}
                    scaleY={Math.max(0.1, scale)}
                >
                    {LAYERS.map((layer) => {
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
        </div >
    )
}
