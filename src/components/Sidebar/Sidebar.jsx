import { observer } from 'mobx-react-lite';
import './Sidebar.scss';
import ParallaxStore from '../../stores/parallaxStore';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import HeaderAnimatedLogo from "../../HeaderAnimatedLogo";
import { useEffect, useState } from 'react';

const els = [
    {
        name: '3D & CGI',
        linkTo: 'cgiAnd3d',
    }, {
        name: 'ANIMATIONS',
        linkTo: 'animations'
    }, {
        name: 'MOTION DESIGN',
        linkTo: 'motionDesign'
    }, {
        name: 'BRANDING & NARRATIVE',
        linkTo: 'brandingAndNarrative'
    }, {
        name: 'WEB & APP DESIGN',
        linkTo: 'webAndAppDesign'
    }, {
        name: '2D ILLUSTRATIONS',
        linkTo: 'illustrations2d'
    }
];


export default observer(({ opened, close }) => {

    const [oldImg, setoldImg] = useState('nigga');
    const [newImg, setnewImg] = useState('nigga');
    const [newImgOpacity, setnewImgOpacity] = useState(0);

    useEffect(() => {
        if (!ParallaxStore.currentSlide) return
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

    const [logoVisible, setlogoVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setlogoVisible(opened)
        }, 1000);
    }, [opened])

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
            <div className='Sidebar_right'>
                <div className='Sidebar_header'>
                    <SidebarHeader close={close} />
                </div>
                <div className='Sidebar_right_content'>
                    {
                        els.map((el, index) => (
                            <a href={`#${el.linkTo}`} className={`Sidebar_right_content_item`} key={`Sidebar_right_content_item_${index}`} onClick={() => {
                                close()
                            }}>
                                {el.name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})