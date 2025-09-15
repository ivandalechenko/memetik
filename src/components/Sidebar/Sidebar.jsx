import { observer } from 'mobx-react-lite';
import './Sidebar.scss';
import ParallaxStore from '../../stores/parallaxStore';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import HeaderAnimatedLogo from "../../HeaderAnimatedLogo";
import { useEffect, useState } from 'react';
import ShareBtn from '../ShareBtn/ShareBtn';
import PinkTitle from '../PinkTitle/PinkTitle';
import WhiteText from '../WhiteText/WhiteText';

const els = [
    {
        name: 'BRANDING & NARRATIVE',
        linkTo: 'BrandingAndNarrative'
    },
    {
        name: '2D ILLUSTRATIONS',
        linkTo: 'Illustrations2d'
    },
    {
        name: '3D & CGI',
        linkTo: 'CgiAnd3d',
    },
    {
        name: 'MOTION DESIGN',
        linkTo: 'MotionDesign'
    },
    {
        name: 'ANIMATIONS',
        linkTo: 'Animations'
    }, {
        name: 'WEB & APP DESIGN',
        linkTo: 'WebAndAppDesign'
    },
];

const casesEls = [
    {
        title: 'Memefi',
        ath: '1.00B',
        img: './cases/memeFi.png'
    },
    {
        title: 'Hippo',
        ath: '1.00B',
        img: './cases/hippo.png'
    },
    {
        title: 'Fred',
        ath: '1.00B',
        img: './cases/fred.png'
    },
    {
        title: 'Pnut',
        ath: '1.00B',
        img: './cases/pnut.png'
    },
    {
        title: 'Memefi',
        ath: '1.00B',
        img: './cases/memeFi.png'
    },
    {
        title: 'Hippo',
        ath: '1.00B',
        img: './cases/hippo.png'
    },
    {
        title: 'Fred',
        ath: '1.00B',
        img: './cases/fred.png'
    },
    {
        title: 'Hippo',
        ath: '1.00B',
        img: './cases/hippo.png'
    },
    {
        title: 'Fred',
        ath: '1.00B',
        img: './cases/fred.png'
    },
]

const tabs = ['Services', 'Cases', 'Vision', 'Consultation']

export default observer(({ opened, close }) => {

    const [activeTab, setactiveTab] = useState('Services');

    const [oldImg, setoldImg] = useState('nigga');
    const [newImg, setnewImg] = useState('nigga');
    const [newImgOpacity, setnewImgOpacity] = useState(0);

    useEffect(() => {
        const slide = ParallaxStore.currentSlide || 'nigga'
        setnewImg(slide)
        setTimeout(() => {
            setnewImgOpacity(1)
        }, 50);
        setTimeout(() => {
            setoldImg(slide)
            setTimeout(() => {
                setnewImgOpacity(0)
            }, 50);
        }, 300);
    }, [ParallaxStore.currentSlide])

    const [logoVisible, setlogoVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setlogoVisible(opened)
        }, 1000);
    }, [opened])

    const changeActiveTab = (tab) => {
        setactiveTab(tab);
    }

    return (
        <div className={`Sidebar ${opened && 'Sidebar_open'}`}>
            <div className={`Sidebar_left ${opened && 'Sidebar_left_open'}`}>
                <div className='Sidebar_left_bg free_img'>
                    <img src={`/sideBar/decor/${oldImg}.webp`} alt="" />
                </div>
                <div className='Sidebar_left_bg free_img'>
                    <img src={`/sideBar/decor/${newImg}.webp`} style={{
                        opacity: newImgOpacity
                    }} alt="" />
                </div>
                <div className='Sidebar_left_logo free_img' style={{
                    opacity: logoVisible ? 1 : 0
                }}>
                    <HeaderAnimatedLogo size={300} />
                </div>
            </div>
            <div className={`Sidebar_right Sidebar_right_${activeTab}`}>
                <div className='Sidebar_header'>
                    <SidebarHeader close={close} tabs={tabs} onClick={changeActiveTab} />
                </div>
                <div className={`Sidebar_right_content Sidebar_right_content_${activeTab !== 'Services' && 'unFlex'} Sidebar_right_content_${activeTab}`}>
                    {
                        activeTab == 'Services' && els.map((el, index) => (
                            <a href={`#${el.linkTo}`} className={`Sidebar_right_content_item`} key={`Sidebar_right_content_item_${index}`} onClick={() => {
                                close()
                            }}>
                                {el.name}
                            </a>
                        ))
                    }
                    {
                        activeTab == 'Cases' && casesEls.map((el, index) => (
                            <div className='Sidebar_right_content_el' key={`Sidebar_right_content_el_${index}`}>
                                <div className='Sidebar_right_content_el_left'>
                                    <img src={el.img} alt="" />
                                    {el.title}
                                </div>
                                <div className='Sidebar_right_content_el_right'>
                                    ATH: {el.ath}
                                </div>
                            </div>
                        ))
                    }
                    {
                        activeTab == 'Vision' &&
                        <>
                            <div className='Sidebar_right_content_vision'>
                                <PinkTitle text={'For us, branding, digital, and content are one picture.'} />
                                <WhiteText text={'We built an agency with deep expertise in each discipline, integrated to work in perfect sync. That’s rare. We create holistic brand worlds that cover every moment of the customer journey - Web3 & Web2. '} />
                                <WhiteText text={'The world shifts fast. Markets and narratives change overnight. Speed is the advantage - adapt quickly, ship cleanly, measure honestly. '} />
                                <WhiteText text={'We break complex ideas into a clear, organized story. We don’t sell vibes. We sell outcomes. Better than words are numbers: the revenue our work brings to the founders we partner with. '} />
                                <PinkTitle text={'What people come to us for:'} />
                                <ul className='ul'>
                                    <li className='ul_li'>launch a new brand or refresh an existing one;</li>
                                    <li className='ul_li'>build best-in-class ecommerce;</li>
                                    <li className='ul_li'>create digitally native content;</li>
                                    <li className='ul_li'>drive sales and awareness through paid campaigns;</li>
                                    <li className='ul_li'>plan and manage social accounts;</li>
                                    <li className='ul_li'>have us act as an extension of their team.</li>
                                </ul>
                                <WhiteText text={'Roughly a 50/50 split between projects and AOR. Some collaborations run 2+ years. Partners range from pre-launch startups with big investments.'} />
                            </div>
                        </>
                    }
                    {
                        activeTab == 'Consultation' &&
                        <>
                            <div className='Sidebar_right_content_consultation'>
                                <PinkTitle text={'Talk first, ship faster'} />
                                <WhiteText text={'Got an idea, a mess, or a pitch scribbled on a napkin? Perfect. We’ll jump on a quick call, ask the annoying questions, and hand you back a one-page roadmap. No buzzwords, no “let’s circle back,” only the shortest route to launch.'} />
                                <ul className='ul'>
                                    <li className='ul_li'>
                                        Share your idea — give us the vision and the goal.
                                    </li>
                                    <li className='ul_li'>
                                        Get sharp insights — we brainstorm and propose creative options.
                                    </li>
                                    <li className='ul_li'>
                                        Plan & ship together — a clear step-by-step roadmap to launch.
                                    </li>
                                </ul>
                                <WhiteText text={'Choose your preferred way to connect:'} />
                                <div className='Sidebar_consultation_btns'>
                                    <ShareBtn title={'Telegram'} black tg />
                                    <ShareBtn title={'Twitter'} black twitter />
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className={`Sidebar_right_cta Sidebar_right_cta_${activeTab}`}>
                    <div className='Sidebar_right_cta_text'>
                        {activeTab}
                    </div>
                    {
                        activeTab == 'Cases' && <ShareBtn title={'Show more'} black />
                    }
                    {
                        activeTab == 'Vision' && <ShareBtn title={'Contact us'} black />
                    }
                </div>
            </div>
        </div>
    )
})