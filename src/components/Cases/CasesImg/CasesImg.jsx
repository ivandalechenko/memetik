import { useState } from 'react';
import ShareBtn from '../../ShareBtn/ShareBtn';
import './CasesImg.scss';
import imgViewerStore from '../../../stores/imgViewerStore';
export default ({ img }) => {


    return (
        <div className='CasesImg' style={{backgroundImage: `url(${img})`}} onClick={() => {imgViewerStore.changeModal(); imgViewerStore.setImg(img)}}>
            <div className='CasesImg_btn'>
                <ShareBtn onClick={() => {imgViewerStore.changeModal(); imgViewerStore.setImg(img)}}/>
            </div>
        </div>
    )
}