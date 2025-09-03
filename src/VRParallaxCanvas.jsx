import { useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'

// Конфиг слоёв: позиция в процентах относительно центра канваса
// и ширина изображения в процентах от ширины канваса.
// ampX/ampY — амплитуды параллакса (px).
const LAYERS = [
    { key: 'bg', src: '/vr/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 10 },
    { key: 'char', src: '/vr/char.webp', widthPercent: 80, posXPercent: 0, posYPercent: 0, ampX: 40, ampY: 30 },
    { key: 'bonk', src: '/vr/bonk.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 45, ampY: 34 },
    { key: 'catfrog', src: '/vr/catfrog.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 48, ampY: 36 },
    { key: 'fred', src: '/vr/fred.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 52, ampY: 39 },
    { key: 'hippo', src: '/vr/hippo.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 56, ampY: 42 },
    { key: 'knut', src: '/vr/knut.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 60, ampY: 45 },
    { key: 'pnut', src: '/vr/pnut.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 64, ampY: 48 },
    { key: 'sunday', src: '/vr/sunday.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 68, ampY: 51 },
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

    // Build rects per layer according to config
    const rects = useMemo(() => {
        return {
            bg: computeRect(bgImg, LAYERS[0].widthPercent, LAYERS[0].posXPercent, LAYERS[0].posYPercent),
            char: computeRect(charImg, LAYERS[1].widthPercent, LAYERS[1].posXPercent, LAYERS[1].posYPercent),
            bonk: computeRect(bonkImg, LAYERS[2].widthPercent, LAYERS[2].posXPercent, LAYERS[2].posYPercent),
            catfrog: computeRect(catfrogImg, LAYERS[3].widthPercent, LAYERS[3].posXPercent, LAYERS[3].posYPercent),
            fred: computeRect(fredImg, LAYERS[4].widthPercent, LAYERS[4].posXPercent, LAYERS[4].posYPercent),
            hippo: computeRect(hippoImg, LAYERS[5].widthPercent, LAYERS[5].posXPercent, LAYERS[5].posYPercent),
            knut: computeRect(knutImg, LAYERS[6].widthPercent, LAYERS[6].posXPercent, LAYERS[6].posYPercent),
            pnut: computeRect(pnutImg, LAYERS[7].widthPercent, LAYERS[7].posXPercent, LAYERS[7].posYPercent),
            sunday: computeRect(sundayImg, LAYERS[8].widthPercent, LAYERS[8].posXPercent, LAYERS[8].posYPercent),
        }
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

    // Parallax offsets per layer
    const offsets = {
        bg: {
            x: -currentMouse.current.x * LAYERS[0].ampX,
            y: bias * LAYERS[0].ampY + (-currentMouse.current.y * LAYERS[0].ampY * yStrength(-currentMouse.current.y)),
        },
        char: {
            x: currentMouse.current.x * LAYERS[1].ampX,
            y: bias * LAYERS[1].ampY + (currentMouse.current.y * LAYERS[1].ampY * yStrength(currentMouse.current.y)),
        },
        bonk: {
            x: currentMouse.current.x * LAYERS[2].ampX,
            y: bias * LAYERS[2].ampY + (currentMouse.current.y * LAYERS[2].ampY * yStrength(currentMouse.current.y)),
        },
        catfrog: {
            x: currentMouse.current.x * LAYERS[3].ampX,
            y: bias * LAYERS[3].ampY + (currentMouse.current.y * LAYERS[3].ampY * yStrength(currentMouse.current.y)),
        },
        fred: {
            x: currentMouse.current.x * LAYERS[4].ampX,
            y: bias * LAYERS[4].ampY + (currentMouse.current.y * LAYERS[4].ampY * yStrength(currentMouse.current.y)),
        },
        hippo: {
            x: currentMouse.current.x * LAYERS[5].ampX,
            y: bias * LAYERS[5].ampY + (currentMouse.current.y * LAYERS[5].ampY * yStrength(currentMouse.current.y)),
        },
        knut: {
            x: currentMouse.current.x * LAYERS[6].ampX,
            y: bias * LAYERS[6].ampY + (currentMouse.current.y * LAYERS[6].ampY * yStrength(currentMouse.current.y)),
        },
        pnut: {
            x: currentMouse.current.x * LAYERS[7].ampX,
            y: bias * LAYERS[7].ampY + (currentMouse.current.y * LAYERS[7].ampY * yStrength(currentMouse.current.y)),
        },
        sunday: {
            x: currentMouse.current.x * LAYERS[8].ampX,
            y: bias * LAYERS[8].ampY + (currentMouse.current.y * LAYERS[8].ampY * yStrength(currentMouse.current.y)),
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
