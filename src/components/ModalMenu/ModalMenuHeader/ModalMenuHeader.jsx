import { observer } from 'mobx-react-lite';
import HeaderModalStore from '../../../stores/HeaderModalStore';
import './ModalMenuHeader.scss';
import { useEffect, useState } from 'react';

export default observer(() => {

    const els = [
        {
            title: 'Services'
        },
        {
            title: 'Cases'
        },
        {
            title: 'Vision'
        },
        {
            title: 'Consultation'
        }
    ]

    const [visibleTab, setVisibleTab] = useState(HeaderModalStore.activeTabTop);
    const [menuOpen, setMenuOpen] = useState(true);

    useEffect(() => {
        setVisibleTab(null);
        const timeout = setTimeout(() => {
            setVisibleTab(HeaderModalStore.activeTabTop);
        }, 300);
        return () => clearTimeout(timeout);
    }, [HeaderModalStore.activeTabTop]);

    return (
        <div className='ModalMenuHeader'>
            <div className='ModalMenuHeader_btns'>
                {els.map((el, index) => {
                    const isActive = HeaderModalStore.activeTabTop === el.title;
                    const isVisible = visibleTab === el.title;
                    return (
                        <div className={`CasesHeader_item ${isActive && ' CasesHeader_item_active'} ${isVisible && ' CasesHeader_item_active_isVisible'}`} key={`ModalMenuHeader_btns_item_key_${index} `} onClick={() => { HeaderModalStore.setActiveTabTop(el.title) }}>
                            {el.title}
                        </div>
                    )
                })}
            </div>
            {/* <div className='ModalMenuHeader_close'>
                <div className='Header_burger'>
                    <button
                        type="button"
                        // aria-label="Toggle menu"
                        // aria-expanded={menuOpen}
                        className={`burger ${HeaderModalStore.isOpen ? 'active' : ''}`}
                        onClick={() => {HeaderModalStore.changeModalOpen()}}
                    >
                        <span className="line" />
                        <span className="line" />
                        <span className="line" />
                    </button>
                </div>
            </div> */}
        </div>
    )
})