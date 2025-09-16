import { observer } from 'mobx-react-lite';
import './CasesHeader.scss';
import { useEffect, useState } from 'react';
import HeaderBurger from '../../../HeaderBurger';
import pathStore from '../../../stores/PathStore';

export default observer(({ selected, setselected, onClick }) => {
    const els = ['Projects', 'Design', 'Animations', '2D Illustration', 'Motion', 'CGI', 'Branding'];

    const [opened, setOpened] = useState(true);

    return (
        <div className='CasesHeader'>
            <div className='CasesHeader_img'>
                <img src="./logoSky.webp" alt="" />
            </div>
            <div className='CasesHeader_nav'>
                {els.map((el, index) => {
                    return (
                        <div
                        className={`CasesHeader_item ${selected == el && ' CasesHeader_item_active'}`}
                        key={`CasesHeader_item_key_${index}`}
                        onClick={() => {onClick(el)}}
                        >
                            {el}
                        </div>
                    );
                })}
            </div>
            <div className='CasesHeader_close'>
                <HeaderBurger isCross={opened}/>
            </div>
        </div>
    );
});