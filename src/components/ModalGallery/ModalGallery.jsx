import { observer } from 'mobx-react-lite';
import modalStore from '../../stores/modalStore';
import './ModalGallery.scss';
import CloseBtn from './CloseBtn/CloseBtn';
import { useEffect, useState } from 'react';

export default observer(() => {
    const [anim, setAnim] = useState(false);
    const [closing, setClosing] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        if (modalStore.isOpen && !closing) {
            setTimeout(() => setAnim(true), 10);
        }
    }, [modalStore.isOpen, closing]);

    if (!modalStore.isOpen || !modalStore.imgRect) return null;

    const { top, left, width, height } = modalStore.imgRect;

    const handleClose = () => {
        setAnim(false);
        setClosing(true);
        setShowBtn(false);

        setTimeout(() => {
            modalStore.changeModal();
            modalStore.setImg('');
            setClosing(false);
        }, 700);
    };

    return (
        <div className={`ModalGallery${modalStore.isOpen ? ' ModalGallery_open' : ''}`}>
            <div
                className="ModalGallery_content"
                style={{
                    backgroundImage: `url(${modalStore.img})`,
                    position: 'fixed',
                    top: anim ? '50%' : top,
                    left: anim ? '50%' : left,
                    width: anim ? '100vw' : width,
                    height: anim ? '100vh' : height,
                    backgroundColor: anim ? '#000' : 'transparent',
                    transform: anim ? 'translate(-50%, -50%)' : 'none',
                    transition: 'all 700ms cubic-bezier(.77,0,.18,1)',
                    zIndex: 99999,
                }}
                onTransitionEnd={() => {
                    if (anim && !closing) {
                        setShowBtn(true);
                    }
                }}
            >
                <div className={`ModalGallery_btn ${showBtn && 'ModalGallery_btn_active'}`}>
                    <CloseBtn onClick={handleClose} />
                </div>
            </div>
        </div>
    );
});
