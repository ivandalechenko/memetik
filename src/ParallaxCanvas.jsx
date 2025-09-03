import { useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import './styles/ParallaxCanvas.scss'

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

export default function ParallaxCanvas({ blur = 0, position = 1 }) {
    const { width, height } = useWindowSize()

    // Load images from public folder
    const bgImg = useHTMLImage('/nPanarama/bg.webp')
    const roomImg = useHTMLImage('/nPanarama/room.webp')
    const papersImg = useHTMLImage('/nPanarama/papers.webp')
    const manImg = useHTMLImage('/nPanarama/man.webp')

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

    // Compute draw rect with overscan padding to hide edges during parallax
    const computeDraw = (image, padX = 0, padY = 0) => {
        if (!image) return { x: 0, y: 0, width: 0, height: 0 }
        const scaleW = (width + 2 * padX) / image.width
        const scaleH = (height + 2 * padY) / image.height
        const scale = Math.max(scaleW, scaleH)
        const w = image.width * scale
        const h = image.height * scale
        const x = (width - w) / 2
        const y = (height - h) / 2
        return { x, y, width: w, height: h }
    }

    const safety = 10
    const bgRect = useMemo(() => computeDraw(bgImg, 20 + safety, 10 + safety), [bgImg, width, height])
    const roomRect = useMemo(() => computeDraw(roomImg, 24 + safety, 18 + safety), [roomImg, width, height])
    const papersRect = useMemo(() => computeDraw(papersImg, 60 + safety, 45 + safety), [papersImg, width, height])
    const manRect = useMemo(() => computeDraw(manImg, 40 + safety, 30 + safety), [manImg, width, height])

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

    // Parallax offsets (in pixels)
    const bgOffset = {
        x: -currentMouse.current.x * 20,
        y: -currentMouse.current.y * 10 * yStrength(-currentMouse.current.y),
    }

    const roomOffset = {
        x: currentMouse.current.x * 24,
        y: currentMouse.current.y * 18 * yStrength(currentMouse.current.y),
    }

    const papersOffset = {
        x: currentMouse.current.x * 60,
        y: currentMouse.current.y * 45 * yStrength(currentMouse.current.y),
    }

    const manOffset = {
        x: currentMouse.current.x * 40,
        y: currentMouse.current.y * 30 * yStrength(currentMouse.current.y),
    }

    return (
        <div className='ParallaxCanvas' style={{ filter: blur ? `blur(${blur}px)` : 'none' }}>
            <Stage width={width} height={height} listening={false}>
                <Layer>
                    {bgImg && (
                        <KonvaImage
                            image={bgImg}
                            x={bgRect.x + bgOffset.x}
                            y={bgRect.y + bgOffset.y}
                            width={bgRect.width}
                            height={bgRect.height}
                        />
                    )}
                    {roomImg && (
                        <KonvaImage
                            image={roomImg}
                            x={roomRect.x + roomOffset.x}
                            y={roomRect.y + roomOffset.y}
                            width={roomRect.width}
                            height={roomRect.height}
                        />
                    )}
                    {manImg && (
                        <KonvaImage
                            image={manImg}
                            x={manRect.x + manOffset.x}
                            y={manRect.y + manOffset.y}
                            width={manRect.width}
                            height={manRect.height}
                        />
                    )}
                    {papersImg && (
                        <KonvaImage
                            image={papersImg}
                            x={papersRect.x + papersOffset.x}
                            y={papersRect.y + papersOffset.y}
                            width={papersRect.width}
                            height={papersRect.height}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    )
}
