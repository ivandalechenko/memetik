import { observer } from 'mobx-react-lite';
import modalStore from '../../stores/modalStore';
import './ModalGallery.scss';
import CloseBtn from './CloseBtn/CloseBtn';

export default observer(({ img }) => {
    return (
        <div className={`ModalGallery ${modalStore.isOpen && 'ModalGallery_open'}`}>
            <div className='ModalGallery_content' style={{backgroundImage: `url(${modalStore.img})`}}>
                <div className='ModalGallery_btn'>
                    <CloseBtn onClick={() => {modalStore.changeModal(); modalStore.setImg('')}}/>
                </div>
            </div>
        </div>
    )
})