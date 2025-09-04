import { observer } from 'mobx-react-lite';
import './ModalMenu.scss';
import HeaderModalStore from '../../stores/HeaderModalStore';
import ModalMenuHeader from './ModalMenuHeader/ModalMenuHeader';

export default observer(() => {

    const els = ['3D & CGI', 'ANIMATIONS', 'MOTION DESIGN', 'BRANDING & NARRATIVE', 'WEB & APP DESIGN', '2D ILLUSTRATIONS'];

    return (
        <div className={`ModalMenu ${HeaderModalStore.isOpen && 'ModalMenu_open'}`}>
            <div className='ModalMenu_left'>

            </div>
            <div className='ModalMenu_right'>
                <ModalMenuHeader />
                <div className='ModalMenu_right_content'>
                    {
                        els.map((el, index) => (
                            <div className={`ModalMenu_right_content_item ${HeaderModalStore.activeTabMenu === el ? ' ModalMenu_right_content_item_active' : ''}`} key={`ModalMenu_right_content_item_${index}`} onClick={() => HeaderModalStore.setActiveTabMenu(el)}>
                                {el}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
})