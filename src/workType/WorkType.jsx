import '../styles/WorkType.scss';

import WtBranding from './WtBranding';
import WtCGI from './WtCGI';
import WtAnimations from './WtAnimations';
import WtCases from './WtCases';
import WtMotion from './WtMotion';
import WtWeb from './WtWeb';
import WtIllustrations from './WtIllustrations';
import WtPartners from './WtPartners';


export default ({ componentName, from = "", to = "" }) => {
    return (
        <>
            {
                componentName == 'Branding' && <WtBranding from={from} to={to} title={'Branding + Narrative'} title2={'creation'} pinkTitle={<>Unique content<br />based on narrative<br /> of your token</>} description={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM. <br /> &nbsp; <br /> If it works in a post, it works for the brand. </>} cta={'Show More'} img1={'./preview.png'} img2={'./secPreview.png'} img3={'./preview.png'}/>
            }
            {
                componentName == 'CGI' && <WtCGI from={from} to={to} title={'CGI/3D'} pinkTitle={<>CGI and short <br /> videos for socials</>} description={<>Want to bring your lore to life or <br /> give your project a face? No <br /> problem — we’ll make it shine. <br /> We’ll help highlight your  <br /> project’s or product’s strengths <br /> — perfect for trailers, <br /> announcements, and demos. <br /> &nbsp; <br /> Not everyone knows this video <br /> format yet, but it always grabs <br /> attention. </>} cta={'Show More'} img1={'./preview.png'} img2={'./thirdPreview.png'} img3={'./thirdPreview.png'}/>
            }
            {
                componentName == 'Animations' && <WtAnimations from={from} to={to} title={'Animations'} pinkTitle={<>2D animation that <br /> hooks in three <br /> seconds.</>} img1={'./preview.png'} img2={'./preview.png'} img3={'./preview.png'} description={<>Hand-made, frame by frame. <br /> Our 2D team turn ideas into <br /> striking videos that capture <br /> attention and drive traffic, <br /> helping your socials scale. <br /> We work fast, sharp, and if <br /> needed sleepless, because <br /> results don’t wait. <br /> &nbsp; <br />     A full animation in 24 hours? <br /> Believe it: that’s how we work. </>} cta={'Show More'}/>
            }
            {
                componentName == 'CASES' && <WtCases />
            }
            {
                componentName == 'Motion' && <WtMotion from={from} to={to} title={'Motion design'} img1={'./preview.png'} pinkTitle={<>Motion design to <br /> bring your project <br /> alive.</>} description={<>We build a unified language of <br /> movement around your idea: <br /> titles, transitions, logo behavior, <br /> and UI animation — all as one <br /> system. Instantly readable, <br /> rhythm-driven, and always <br /> focused. <br /> &nbsp; <br /> And also yes — we craft custom <br /> Rive animations for websites <br /> and apps, for a truly unique user <br /> experience. </>} cta={'Show more'} img2={'./preview.png'} img3={'./preview.png'}/>
            }
            {
                componentName == 'Web' && <WtWeb from={from} to={to} NoPb title={'Web/App Design '} title2={'+ development'} img1={'./preview.png'} img2={'./preview.png'} pinkTitle={<>Web & dApps — <br /> from landing <br /> pages to smart <br /> contracts.</>} description={<>We build original, non-template <br /> websites and on-chain products <br /> that stand out and are <br /> engineered right. We deliver <br /> wild ideas fast and keep <br /> everything stable — no outages, <br /> no bugs. <br /> &nbsp; <br /> Need a rocket? We’ll build a <br /> rocket. </>} cta={'Show more'} img3={'./preview.png'}/>
            }
            {
                componentName == 'Illustrations' && <WtIllustrations from={from} to={to} NoPb title={'Illustrations'} title2={'+ stickers + banners'} img1={'./preview.png'} pinkTitle={<>Visual ammo for <br /> your daily growth.</>} description={<>What helps push a brand and a <br /> mascot better than art or eye-<br />catching banners on X? Exactly<br /> — nothing. Or almost nothing<br /> and those rare exceptions are <br /> listed below on our site. <br /> We create visual content <br /> tailored to your needs. <br /> &nbsp; <br /> God is in the details — that’s <br /> what keeps you ahead. </>} cta={'Show more'} img2={'./preview.png'} img3={'./preview.png'}/>
            }
            {
                componentName == 'PARTNERS' && <WtPartners />
            }
        </>
    )
}