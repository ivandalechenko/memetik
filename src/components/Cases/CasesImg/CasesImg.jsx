import { useState } from 'react';
import ShareBtn from '../../ShareBtn/ShareBtn';
import './CasesImg.scss';
import imgViewerStore from '../../../stores/imgViewerStore';
import { observer } from 'mobx-react-lite';

import { useRef } from 'react';

export default observer(({ img }) => {

    const imgRef = useRef(null);

    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        imgViewerStore.setImg(img);
        imgViewerStore.setImgRect(rect);
        imgViewerStore.setImgNatural(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
        imgViewerStore.changeModal();
    };

    return (
        <div className='CasesImg' style={{backgroundImage: `url(${img})`}} onClick={handleClick} ref={imgRef}>
            <div className='CasesImg_btn'>
                <ShareBtn onClick={handleClick} black/>
            </div>
        </div>
    )
})