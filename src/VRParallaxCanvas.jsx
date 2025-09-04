import { useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'

// Конфиг слоёв: позиция в процентах относительно центра канваса
// и ширина изображения в процентах от ширины канваса.
// ampX/ampY — амплитуды параллакса (px).
// TODO сделай что бы те картинки(hippo, sunday, catfrog), которые находиться за человеком, двигались в противоположную сторону от движения мышки/остальных картинок
const LAYERS = [
    { key: 'bg', src: '/vr/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 10 },
    { key: 'bonk', src: '/vr/bonk.webp', widthPercent: 70, posXPercent: 10, posYPercent: -10, ampX: 45, ampY: 34 },
    { key: 'catfrog', src: '/vr/catfrog.webp', widthPercent: 70, posXPercent: 0, posYPercent: -10, ampX: 48, ampY: 36 },
    { key: 'hippo', src: '/vr/hippo.webp', widthPercent: 70, posXPercent: 0, posYPercent: -10, ampX: 56, ampY: 42 },//за челиком
    { key: 'knut', src: '/vr/knut.webp', widthPercent: 80, posXPercent: 10, posYPercent: -10, ampX: 60, ampY: 45 },
    { key: 'pnut', src: '/vr/pnut.webp', widthPercent: 70, posXPercent: -40, posYPercent: -20, ampX: 64, ampY: 48 },
    { key: 'sunday', src: '/vr/sunday.webp', widthPercent: 65, posXPercent: -10, posYPercent: 5, ampX: 68, ampY: 51 },//за челиком
    { key: 'fred', src: '/vr/fred.webp', widthPercent: 80, posXPercent: -25, posYPercent: 10, ampX: 52, ampY: 39 },
    { key: 'char', src: '/vr/char.webp', widthPercent: 80, posXPercent: 0, posYPercent: 0, ampX: 40, ampY: 30 },//челик
]

const LAYER_CONFIG = [
    { key: 'bg', speed: .7, levitate: 1 },
    { key: 'bonk', speed: .1, levitate: 2 },
    { key: 'catfrog', speed: 0.7, levitate: 3 },
    { key: 'hippo', speed: .3, levitate: 1 },
    { key: 'knut', speed: .2, levitate: 1 },
    { key: 'pnut', speed: .8, levitate: 2 },
    { key: 'sunday', speed: .2, levitate: 1 },
    { key: 'fred', speed: .05, levitate: 3 },
    { key: 'char', speed: .6, levitate: 2 },
];

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

export default function ParallaxCanvas({ blur = 0, position = 1, scale = 1 }) {
    const { width, height } = useWindowSize()

    // Load images from public folder
    const bgImg = useHTMLImage('/vr/bg.webp')
    const charImg = useHTMLImage('/vr/char.webp')
    const bonkImg = useHTMLImage('/vr/bonk.webp')
    const catfrogImg = useHTMLImage('/vr/catfrog.webp')
    const fredImg = useHTMLImage('/vr/fred.webp')
    const hippoImg = useHTMLImage('/vr/hippo.webp')
    const knutImg = useHTMLImage('/vr/knut.webp')
    const pnutImg = useHTMLImage('/vr/pnut.webp')
    const sundayImg = useHTMLImage('/vr/sunday.webp')

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
        const imgMap = {
            bg: bgImg,
            char: charImg,
            bonk: bonkImg,
            catfrog: catfrogImg,
            fred: fredImg,
            hippo: hippoImg,
            knut: knutImg,
            pnut: pnutImg,
            sunday: sundayImg,
        }
        const entries = LAYERS.map((layer) => [
            layer.key,
            computeRect(
                imgMap[layer.key],
                layer.widthPercent,
                layer.posXPercent,
                layer.posYPercent
            ),
        ])
        return Object.fromEntries(entries)
    }, [bgImg, charImg, bonkImg, catfrogImg, fredImg, hippoImg, knutImg, pnutImg, sundayImg, width, height])

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

    const getX = (index, invert) => {
        const { key, speed, levitate } = LAYER_CONFIG[index];
        const randomLevitate = getRandom(key, 'x', levitate, speed);
        if (invert) {
            return -currentMouse.current.x * LAYERS[index].ampX + randomLevitate;
        }
        return currentMouse.current.x * LAYERS[index].ampX + randomLevitate;
    };

    const getY = (index, invert) => {
        const { key, speed, levitate } = LAYER_CONFIG[index];
        const randomLevitate = getRandom(key, 'y', levitate, speed);
        if (invert) {
            return bias * LAYERS[index].ampY - (currentMouse.current.y * LAYERS[index].ampY * yStrength(currentMouse.current.y)) + randomLevitate;
        }
        return bias * LAYERS[index].ampY + (currentMouse.current.y * LAYERS[index].ampY * yStrength(currentMouse.current.y)) + randomLevitate;
    };

    // Parallax offsets per layer
    const offsets = {
        bg: {
            x: getX(0, true),
            y: getY(0),
            },
        char: {
            x: getX(1),
            y: getY(1),
        },
        bonk: {
            x: getX(2, true),
            y: getY(2, true),
        },
        catfrog: {
            x: getX(3),
            y: getY(3)
        },
        fred: {
            x: getX(4),
            y: getY(4, true),
        },
        hippo: {
            x: getX(5, true),
            y: getY(5, true),
        },
        knut: {
            x: getX(6),
            y: getY(6),
        },
        pnut: {
            x: getX(6, true),
            y: getY(6),
        },
        sunday: {
            x: getX(7),
            y: getY(7),
        },
    }

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
                        const imgMap = {
                            bg: bgImg,
                            char: charImg,
                            bonk: bonkImg,
                            catfrog: catfrogImg,
                            fred: fredImg,
                            hippo: hippoImg,
                            knut: knutImg,
                            pnut: pnutImg,
                            sunday: sundayImg,
                        }
                        const img = imgMap[layer.key]
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
