import { observer } from 'mobx-react-lite';
import modalStore from '../../stores/modalStore';
import './ModalGallery.scss';
import CloseBtn from './CloseBtn/CloseBtn';
import { useEffect, useState } from 'react';

export default observer(() => {
    const [anim, setAnim] = useState(false);
    const [closing, setClosing] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [changeBg, setchangeBg] = useState(false);

    useEffect(() => {
        if (modalStore.isOpen && !closing) {
            setTimeout(() => setAnim(true), 10);
        }
    }, [modalStore.isOpen, closing]);

    useEffect(() => {
        if (modalStore.isOpen) {
            setTimeout(() => setchangeBg(true), 400);
        }
    }, [modalStore.isOpen]);

    if (!modalStore.isOpen || !modalStore.imgRect) return null;

    const { top, left, width, height } = modalStore.imgRect;

    const handleClose = () => {
        setAnim(false);
        setClosing(true);
        setShowBtn(false);
        setchangeBg(false);

        setTimeout(() => {
            modalStore.changeModal();
            modalStore.setImg('');
            setClosing(false);
        }, 700);
    };

    const natW = modalStore.imgNaturalW || 1;
    const natH = modalStore.imgNaturalH || 1;
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
        <div className={`ModalGallery${modalStore.isOpen ? ' ModalGallery_open' : ''}`}>
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
                    backgroundImage: `url(${modalStore.img})`,
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
