import { observer } from 'mobx-react-lite';
import './SidebarHeader.scss';
import { useState } from 'react';



export default observer(({ tabs, onClick }) => {

    const [activeTab, setactiveTab] = useState(tabs[0]);

    return (
        <div className='SidebarHeader'>
            <div className='SidebarHeader_btns'>
                {tabs.map((tab, index) => {
                    return (
                        <div
                            key={`tab-${index}`}
                            className={`SidebarHeader_btns_item ${activeTab === tab && 'SidebarHeader_btns_item_active'}`}
                            onClick={() => { setactiveTab(tab); onClick(tab) }}
                        >
                            {tab}
                        </div>
                    )
                })}
            </div>
        </div>
    )
})