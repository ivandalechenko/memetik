import { observer } from 'mobx-react-lite';
import './CasesHeader.scss';
import CasesActiveTab from '../../../stores/CasesActiveTab';
import { useEffect, useState } from 'react';

export default observer(() => {
    const els = ['Projects', 'Design', 'Animations', '2D Illustration', 'Motion', 'CGI', 'Branding'];
    const [visibleTab, setVisibleTab] = useState(CasesActiveTab.activeTab);

    useEffect(() => {
        setVisibleTab(null);
        const timeout = setTimeout(() => {
            setVisibleTab(CasesActiveTab.activeTab);
        }, 300);
        return () => clearTimeout(timeout);
    }, [CasesActiveTab.activeTab]);

    return (
        <div className='CasesHeader'>
            {els.map((el, index) => {
                const isActive = CasesActiveTab.activeTab === el;
                const isVisible = visibleTab === el;
                return (
                    <div
                        className={`CasesHeader_item ${isActive && ' CasesHeader_item_active'} ${isVisible && ' CasesHeader_item_active_isVisible'}`}
                        key={`CasesHeader_item_key_${index}`}
                        onClick={() => CasesActiveTab.setActiveTab(el)}
                    >
                        {el}
                    </div>
                );
            })}
        </div>
    );
});