import './BigPlayer.scss';
import { useRef } from 'react';
import imgViewerStore from '../../stores/imgViewerStore';

export default ({ video, time, bottom, pr, left, pin }) => {

    const imgRef = useRef(null);
    
    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        imgViewerStore.setImg(video);
        imgViewerStore.setImgRect(rect);
        imgViewerStore.changeModal();
    };

    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'} ${pr && 'BigPlayer_pr'} ${pin && 'BigPlayer_pin'}`} onClick={ pin ? '' : handleClick}>
            <div className={`BigPlayer_video free_img ${left && 'BigPlayer_video_left'} `}>
                <img src={video} alt="" ref={imgRef}/>
            </div>
        </div>
    )
}