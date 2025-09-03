import { useRef, useState } from "react";
import ParallaxCanvas from "./ParallaxCanvas"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// import './styles/AppTEST.scss';
export default () => {

    const [progress, setprogress] = useState(0);
    const scope = useRef(null)

    useGSAP(() => {
        gsap.to('.AppTEST', {
            scrollTrigger: {
                trigger: '.AppTEST',
                scrub: 1,
                markers: true,
                start: 'top 0%',
                end: 'bottom 100%',
                onUpdate: self => {
                    setprogress(self.progress)
                }
            }
        })

    }, { scope: scope })

    return (
        <div ref={scope} style={{
            width: `100%`,
            overflow: 'hidden'
        }}>
            <div className='AppTEST' style={{
                height: `300vh`
            }}>
                <ParallaxCanvas position={progress} blur={progress * 20} />
            </div>
        </div>
    )
}