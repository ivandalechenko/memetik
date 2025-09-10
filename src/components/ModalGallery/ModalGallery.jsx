import { observer } from 'mobx-react-lite';
import imgViewerStore from '../../stores/imgViewerStore';
import './ModalGallery.scss';
import CloseBtn from './CloseBtn/CloseBtn';
import { useEffect, useState } from 'react';

export default observer(() => {
    const [anim, setAnim] = useState(false);
    const [closing, setClosing] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [changeBg, setchangeBg] = useState(false);

    useEffect(() => {
        if (imgViewerStore.isOpen && !closing) {
            setTimeout(() => setAnim(true), 10);
        }
    }, [imgViewerStore.isOpen, closing]);

    useEffect(() => {
        if (imgViewerStore.isOpen) {
            setTimeout(() => setchangeBg(true), 400);
        }
    }, [imgViewerStore.isOpen]);

    if (!imgViewerStore.isOpen || !imgViewerStore.imgRect) return null;

    const { top, left, width, height } = imgViewerStore.imgRect;

    const handleClose = () => {
        setAnim(false);
        setClosing(true);
        setShowBtn(false);
        setchangeBg(false);

        setTimeout(() => {
            imgViewerStore.changeModal();
            imgViewerStore.setImg('');
            setClosing(false);
        }, 700);
    };

    const natW = imgViewerStore.imgNaturalW || 1;
    const natH = imgViewerStore.imgNaturalH || 1;
    const isLandscape = natW >= natH;
    const aspectHoverW = natH / natW;
    const aspectWoverH = natW / natH;

    const targetWidth = anim
        ? (isLandscape ? '100vw' : `${100 * aspectWoverH}vh`)
        : width;
    const targetHeight = anim
        ? (isLandscape ? `${100 * aspectHoverW}vw` : '100vh')
        : height;

    return (
        <div className={`ModalGallery${imgViewerStore.isOpen ? ' ModalGallery_open' : ''}`}>
            {/* фон */}
            <div
                className="ModalGallery_overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: changeBg ? 'rgba(0,0,0,0.75)' : 'transparent',
                    transition: 'background-color 700ms cubic-bezier(.77,0,.18,1)',
                    zIndex: 99998,
                }}
                onClick={handleClose}
            />
            {/* контент */}
            <div
                className="ModalGallery_content"
                style={{
                    backgroundImage: `url(${imgViewerStore.img})`,
                    backgroundSize: 'cover',
                    position: 'fixed',
                    top: anim ? '50%' : top,
                    left: anim ? '50%' : left,
                    width: targetWidth,
                    height: targetHeight,
                    transform: anim ? 'translate(-50%, -50%)' : 'none',
                    transition: 'all 700ms cubic-bezier(.77,0,.18,1)',
                    zIndex: 99999,
                }}
                onTransitionEnd={() => {
                    if (anim && !closing) setShowBtn(true);
                }}
            >
                <div className={`ModalGallery_btn ${showBtn && 'ModalGallery_btn_active'}`}>
                    <CloseBtn onClick={handleClose} />
                </div>
            </div>
        </div>
    );
});
