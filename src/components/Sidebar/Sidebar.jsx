import { observer } from 'mobx-react-lite';
import './Sidebar.scss';
import ParallaxStore from '../../stores/parallaxStore';
import ModalMenuHeader from './SidebarHeader/SidebarHeader';
import HeaderAnimatedLogo from "../../HeaderAnimatedLogo";
import { useEffect, useState } from 'react';
import sidebar from '../../stores/sidebarStore';

export default observer(({ open }) => {

    const els = ['3D & CGI', 'ANIMATIONS', 'MOTION DESIGN', 'BRANDING & NARRATIVE', 'WEB & APP DESIGN', '2D ILLUSTRATIONS'];

    const [oldImg, setoldImg] = useState('nigga');
    const [newImg, setnewImg] = useState('nigga');
    const [newImgOpacity, setnewImgOpacity] = useState(0);

    useEffect(() => {
        setnewImg(ParallaxStore.currentSlide)
        setTimeout(() => {
            setnewImgOpacity(1)
        }, 50);
        setTimeout(() => {
            setoldImg(ParallaxStore.currentSlide)
            setTimeout(() => {
                setnewImgOpacity(0)
            }, 50);
        }, 300);
    }, [ParallaxStore.currentSlide])

    return (
        <div className={`ModalMenu ${sidebar.isOpen && 'ModalMenu_open'}`}>
            <div className='ModalMenu_left'>
                <div className='ModalMenu_left_bg free_img'>
                    <img src={`/sideBar/decor/${oldImg}.webp`} alt="" />
                </div>
                <div className='ModalMenu_left_bg free_img'>
                    <img src={`/sideBar/decor/${newImg}.webp`} style={{
                        opacity: newImgOpacity
                    }} alt="" />
                </div>
                <div className='ModalMenu_left_logo free_img'>
                    <HeaderAnimatedLogo size={300} />
                </div>
            </div>
            <div className='ModalMenu_right'>
                <ModalMenuHeader />
                <div className='ModalMenu_right_content'>
                    {
                        els.map((el, index) => (
                            <div className={`ModalMenu_right_content_item ${sidebar.activeTabMenu == el && 'ModalMenu_right_content_item_active'} `} key={`ModalMenu_right_content_item_${index}`} onClick={() => {
                                console.log('meow');
                            }}>
                                {el}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})