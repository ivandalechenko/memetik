import { observer } from 'mobx-react-lite';
import './SidebarHeader.scss';
import { useState } from 'react';

const tabs = ['Services', 'Cases', 'Vision', 'Consultation']

export default observer(() => {

    const [activeTab, setactiveTab] = useState(tabs[0]);

    return (
        <div className='SidebarHeader'>
            <div className='SidebarHeader_btns'>
                {tabs.map((tab, index) => {
                    return (
                        <div
                            key={`tab-${index}`}
                            className={`SidebarHeader_btns_item ${activeTab === tab && 'SidebarHeader_btns_item_active'}`}
                            onClick={() => { setactiveTab(tab) }}
                        >
                            {tab}
                        </div>
                    )
                })}
            </div>
        </div>
    )
})