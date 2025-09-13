import './styles/Header.scss';
import { useRef, useState } from 'react';

import HeaderAnimatedLogo from "./HeaderAnimatedLogo";
import { observer } from 'mobx-react-lite';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderBurger from './HeaderBurger';

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




    return (
        <>
            <div className='Header'>
                <div className='Header_left'>
                    <div className='Header_logo'>
                        <HeaderAnimatedLogo size={window.innerWidth < 700 ? 40 : 60} />
                        {/* <img src="/logo.svg" alt="" /> */}
                    </div>
                    <div className='Header_contactUs'>
                        Contact US
                        {/* {parallaxStore.currentSlide} - BLUR:{parallaxStore.currentSlideBlur.toFixed(2)} - POS:{parallaxStore.currentSlideProgress.toFixed(2)} */}
                    </div>
                </div>
                <div className='Header_right'>
                    <div className='Header_nft' onClick={comingSoonHandler}>
                        {comingSoon ? 'Coming soon' : 'NFT generator'}
                    </div>
                </div>
            </div>
            <div onClick={() => { setOpened(o => !o) }}>
                <HeaderBurger isCross={opened} />
            </div>
            <Sidebar opened={opened} close={() => { setOpened(false) }} />
        </>
    )
})