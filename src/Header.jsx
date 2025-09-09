import './styles/Header.scss';
import { useState } from 'react';

import HeaderAnimatedLogo from "./HeaderAnimatedLogo";
import { observer } from 'mobx-react-lite';
import ModalMenu from './components/ModalMenu/ModalMenu';
// import parallaxStore from './stores/parallaxStore';
// import HeaderModalStore from './stores/HeaderModalStore';

export default observer(() => {
    const [opened, open] = useState(false);
    return (
        <>
            <div className='Header'>
                <div className='Header_left'>
                    <div className='Header_logo'>
                        <HeaderAnimatedLogo />
                        {/* <img src="/logo.svg" alt="" /> */}
                    </div>
                    <div className='Header_contactUs'>
                        Contact US
                        {/* {parallaxStore.currentSlide} - BLUR:{parallaxStore.currentSlideBlur.toFixed(2)} - POS:{parallaxStore.currentSlideProgress.toFixed(2)} */}
                    </div>
                </div>
                <div className='Header_right'>
                    {/* <div className='Header_nft'>
                    NFT generator
                </div> */}
                    <div className='Header_burger'>
                        <button
                            type="button"
                            aria-label="Toggle menu"
                            aria-expanded={opened}
                            className={`burger ${opened ? 'active' : ''}`}
                            onClick={() => {
                                open(o => !o)
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