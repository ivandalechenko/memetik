import './Header.scss';
import { useState } from 'react';
export default () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='Header'>
            <div className='Header_left'>
                <div className='Header_logo'>
                    <img src="/logo.svg" alt="" />
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
                        className={`burger ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(v => !v)}
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
