import { useState } from 'react';
import ShareBtn from '../../ShareBtn/ShareBtn';
import './CasesImg.scss';
import modalStore from '../../../stores/modalStore';
export default ({ img }) => {


    return (
        <div className='CasesImg' style={{backgroundImage: `url(${img})`}} onClick={() => {modalStore.changeModal(); modalStore.setImg(img)}}>
            <div className='CasesImg_btn'>
                <ShareBtn onClick={() => {modalStore.changeModal(); modalStore.setImg(img)}}/>
            </div>
        </div>
    )
}