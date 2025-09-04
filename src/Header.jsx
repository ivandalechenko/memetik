import './styles/Header.scss';
import { useState } from 'react';

import HeaderAnimatedLogo from "./HeaderAnimatedLogo";
import HeaderModalStore from './stores/HeaderModalStore';

export default () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='Header'>
            <div className='Header_left'>
                <div className='Header_logo'>
                    <HeaderAnimatedLogo />
                    {/* <img src="/logo.svg" alt="" /> */}
                </div>
                <div className='Header_contactUs'>
                    Contact US
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
                        aria-expanded={menuOpen}
                        className={`burger ${HeaderModalStore.isOpen ? 'active' : ''}`}
                        onClick={() => {
                            // setMenuOpen(v => !v); 
                            HeaderModalStore.changeModalOpen()
                        }}
                    >
                        <span className="line" />
                        <span className="line" />
                        <span className="line" />
                    </button>
                </div>
            </div>
        </div>
    )
}
