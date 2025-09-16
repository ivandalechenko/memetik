import { observer } from 'mobx-react-lite';
import './CasesHeader.scss';
import { useEffect, useState } from 'react';

export default observer(({ selected, setselected, onClick }) => {
    const els = ['Projects', 'Design', 'Animations', '2D Illustration', 'Motion', 'CGI', 'Branding'];

    return (
        <div className='CasesHeader'>
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
    );
});