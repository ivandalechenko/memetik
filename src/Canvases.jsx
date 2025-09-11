import { observer } from "mobx-react-lite"
import parallaxStore from "./stores/parallaxStore"
import ParallaxCanvas from "./ParallaxCanvas"

export default observer(() => {
    return (
        <>
            <ParallaxCanvas
                scale={parallaxStore.currentSlideScale}
                opacity={parallaxStore.currentSlide === 'nigga' ? 1 : 0}
                position={0}
                shift={window.innerWidth < 700 && 1.8}
                LAYERS={[{ key: 'bg', src: '/parallax/nPanarama/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
                { key: 'room', src: '/parallax/nPanarama/room.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 10, ampY: 10, speed: 0, levitate: 0, inverX: false, inverY: false },
                { key: 'man', src: '/parallax/nPanarama/man.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false },
                { key: 'phone', src: '/parallax/nPanarama/phone.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false, animated: true },
                { key: 'papers', src: '/parallax/nPanarama/papers.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 50, ampY: 50, speed: 0, levitate: 0, inverX: false, inverY: false }]}
            />

            <ParallaxCanvas
                // blur={parallaxStore.currentSlideBlur * 30}
                opacity={parallaxStore.currentSlide === 'carCity' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                LAYERS={[
                    { key: 'sky', src: '/parallax/carCity/sky.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'city', src: '/parallax/carCity/city.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 5, ampY: 5, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'car', src: '/parallax/carCity/car.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 40, ampY: 40, speed: 0, levitate: 0, inverX: false, inverY: false },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'manCity' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                LAYERS={[
                    { key: 'sky', src: '/parallax/manCity/sky.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'city', src: '/parallax/manCity/city.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 5, ampY: 5, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'man', src: '/parallax/manCity/man.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 40, ampY: 40, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'lines', src: '/parallax/manCity/lines.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 40, ampY: 40, speed: 0, levitate: 0, inverX: false, inverY: false, animated: true },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'VR' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                LAYERS={[
                    { key: 'bg', src: '/parallax/vr/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 10, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'bonk', src: '/parallax/vr/bonk.webp', widthPercent: 70, posXPercent: 10, posYPercent: -10, ampX: 10, ampY: 5, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'sunday', src: '/parallax/vr/sunday.webp', widthPercent: 65, posXPercent: -10, posYPercent: 5, ampX: 20, ampY: 10, speed: .5, levitate: 5, inverX: false, inverY: false },
                    { key: 'catfrog', src: '/parallax/vr/catfrog.webp', widthPercent: 70, posXPercent: 0, posYPercent: 10, ampX: 30, ampY: 15, speed: .8, levitate: 6, inverX: false, inverY: false },
                    { key: 'hippo', src: '/parallax/vr/hippo.webp', widthPercent: 70, posXPercent: 0, posYPercent: -10, ampX: 40, ampY: 20, speed: 0.4, levitate: 7, inverX: false, inverY: false },
                    { key: 'knut', src: '/parallax/vr/knut.webp', widthPercent: 80, posXPercent: 5, posYPercent: 10, ampX: 50, ampY: 25, speed: .6, levitate: 8, inverX: false, inverY: false },
                    { key: 'char', src: '/parallax/vr/char.webp', widthPercent: 80, posXPercent: 0, posYPercent: 25, ampX: 60, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'fred', src: '/parallax/vr/fred.webp', widthPercent: 80, posXPercent: -25, posYPercent: 10, ampX: 70, ampY: 35, speed: 0.9, levitate: 10, inverX: false, inverY: false },
                    { key: 'pnut', src: '/parallax/vr/pnut.webp', widthPercent: 70, posXPercent: -40, posYPercent: -20, ampX: 80, ampY: 40, speed: 0.7, levitate: 12, inverX: false, inverY: false },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'noteMan' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                LAYERS={[
                    { key: 'bg', src: '/parallax/noteMan/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'bilbords', src: '/parallax/noteMan/bilbords.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true, animated: true },
                    { key: 'man', src: '/parallax/noteMan/man.webp', widthPercent: 105, posXPercent: 0, posYPercent: 10, ampX: 40, ampY: 40, speed: 0, levitate: 0, inverX: false, inverY: false },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'girl' ? 1 : 0}
                position={parallaxStore.currentSlideProgress - .2}
                LAYERS={[
                    { key: 'bg', src: '/parallax/girl/bg.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'char', src: '/parallax/girl/char.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'painting', src: '/parallax/girl/painting.webp', widthPercent: 104, posXPercent: -.5, posYPercent: -1, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false, animated: true },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'coder' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                shift={.9}
                LAYERS={[
                    { key: 'bg', src: '/parallax/coder/bg.webp', widthPercent: 100, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'window', src: '/parallax/coder/window.webp', widthPercent: 120, posXPercent: 0, posYPercent: -10, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'char', src: '/parallax/coder/char.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'coding', src: '/parallax/coder/codingLarge.webp', widthPercent: 105, posXPercent: 0, posYPercent: 0, ampX: 30, ampY: 30, speed: 0, levitate: 0, inverX: false, inverY: false, animated: true },
                ]}
            />
            <ParallaxCanvas
                opacity={parallaxStore.currentSlide === 'cameraMan' ? 1 : 0}
                position={parallaxStore.currentSlideProgress}
                blink={parallaxStore.currentSlideBlinkProgress}
                LAYERS={[
                    { key: 'sky', src: '/parallax/cameraMan/sky.webp', widthPercent: 110, posXPercent: 0, posYPercent: 0, ampX: 20, ampY: 20, speed: 0, levitate: 0, inverX: true, inverY: true },
                    { key: 'char', src: '/parallax/cameraMan/char.webp', widthPercent: 105, posXPercent: 0, posYPercent: 20, ampX: 40, ampY: 60, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'miniBlink', src: '/parallax/cameraMan/miniBlink.webp', widthPercent: 105, posXPercent: 0, posYPercent: 20, ampX: 40, ampY: 60, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'camera', src: '/parallax/cameraMan/camera.webp', widthPercent: 105, posXPercent: 0, posYPercent: 20, ampX: 40, ampY: 60, speed: 0, levitate: 0, inverX: false, inverY: false, animated: true },
                    { key: 'bush', src: '/parallax/cameraMan/bush.webp', widthPercent: 105, posXPercent: 0, posYPercent: 25, ampX: 40, ampY: 90, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'blink', src: '/parallax/cameraMan/blink.webp', widthPercent: 150, posXPercent: 0, posYPercent: 20, ampX: 0, ampY: 0, speed: 0, levitate: 0, inverX: false, inverY: false },
                    { key: 'blinkMeme', src: '/parallax/cameraMan/blinkMeme.webp', widthPercent: 100, posXPercent: 0, posYPercent: 20, ampX: 0, ampY: 0, speed: 0, levitate: 0, inverX: false, inverY: false },
                ]}
            />
        </>
    )
})