import './styles/Header.scss';
import { useRef, useState } from 'react';

import HeaderAnimatedLogo from "./HeaderAnimatedLogo";
import { observer } from 'mobx-react-lite';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderBurger from './HeaderBurger';
import pathStore from './stores/PathStore';
import parallaxStore from './stores/parallaxStore';

export default observer(() => {
    const [opened, setOpened] = useState(false);
    const [comingSoon, setcomingSoon] = useState(false);
    const comingSoonTO = useRef(null)

    const comingSoonHandler = () => {
        clearTimeout(comingSoonTO.current)
        setcomingSoon(true)
        comingSoonTO.current = setTimeout(() => {
            setcomingSoon(false)
        }, 3000);
    }

    const clickHandler = () => {
        console.log('Click')
    }

    return (
        <>
            <div className='Header'>
                <div className="Header_mask"></div>
                <div className='Header_left'>
                    <div className='Header_logo'>
                        {/* {parallaxStore.currentSlideScale.toFixed(2)} - {parallaxStore.currentSlideProgress.toFixed(2)} */}
                        <HeaderAnimatedLogo size={window.innerWidth < 700 ? 40 : 60} />
                        {/* <img src="/logo.svg" alt="" /> */}
                    </div>
                    <div className='Header_contactUs_container' onClick={clickHandler}>
                        {/* Contact US */}
                        {/* {pathStore.path} */}
                        {/* {parallaxStore.currentSlide} - BLUR:{parallaxStore.currentSlideBlur.toFixed(2)} - POS:{parallaxStore.currentSlideProgress.toFixed(2)} */}
                        {
                            pathStore.getPath()[0] !== 'cases' && <div className='Header_contactUs'>
                                {/* Contact US */}
                                {/* {pathStore.path} */}
                                {parallaxStore.currentSlide} - BLUR:{parallaxStore.currentSlideBlur.toFixed(2)} - POS:{parallaxStore.currentSlideProgress.toFixed(2)}
                            </div>
                        }
                    </div>
                </div>
                <div className='Header_right'>
                    {
                        pathStore.getPath()[0] !== 'cases' && <div className='Header_nft' onClick={comingSoonHandler}>
                            {comingSoon ? 'Coming soon' : 'NFT generator'}
                        </div>
                    }

                </div>
            </div>

            <div onClick={() => {
                if (pathStore.getPath()[0] === 'cases') {
                    pathStore.setPath('/')
                } else {
                    setOpened(o => !o)
                }
            }}>
                <HeaderBurger isCross={pathStore.getPath()[0] === 'cases' || opened} />
            </div>
            <Sidebar opened={opened} close={() => { setOpened(false) }} />
        </>
    )
})