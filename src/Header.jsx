import './styles/Header.scss';
import { useRef, useState } from 'react';

import HeaderAnimatedLogo from "./HeaderAnimatedLogo";
import { observer } from 'mobx-react-lite';
import ModalMenu from './components/ModalMenu/ModalMenu';
import parallaxStore from './stores/parallaxStore';
import sidebar from './stores/sidebar';
// import parallaxStore from './stores/parallaxStore';
// import imgViewerStore from './stores/imgViewerStore';

export default observer(() => {
    const [opened, open] = useState(false);
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
                        <HeaderAnimatedLogo />
                        {/* <img src="/logo.svg" alt="" /> */}
                    </div>
                    <div className='Header_contactUs'>
                        {/* Contact US */}
                        {parallaxStore.currentSlide} - BLUR:{parallaxStore.currentSlideBlur.toFixed(2)} - POS:{parallaxStore.currentSlideProgress.toFixed(2)}
                    </div>
                </div>
                <div className='Header_right'>
                    <div className='Header_nft' onClick={comingSoonHandler}>
                        {comingSoon ? 'Coming soon' : 'NFT generator'}

                    </div>
                    <div className='Header_burger'>
                        <button
                            type="button"
                            aria-label="Toggle menu"
                            aria-expanded={opened}
                            // className={`burger ${opened ? 'active' : ''}`}
                            className={`burger`}
                            onClick={() => {
                                open(o => !o)
                                sidebar.changeModalOpen()
                            }}
                        >
                            <span className="line" />
                            <span className="line" />
                            <span className="line" />
                        </button>
                    </div>
                </div>
            </div>
            <ModalMenu open={opened} />
        </>
    )
})