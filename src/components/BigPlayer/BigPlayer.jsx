import './BigPlayer.scss';
import { useRef } from 'react';
import modalStore from '../../stores/modalStore';

export default ({ video, time, bottom, pr, left, pin }) => {

    const imgRef = useRef(null);
    
    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        modalStore.setImg(video);
        modalStore.setImgRect(rect);
        modalStore.changeModal();
    };

    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'} ${pr && 'BigPlayer_pr'} ${pin && 'BigPlayer_pin'}`} onClick={ pin ? '' : handleClick}>
            <div className={`BigPlayer_video free_img ${left && 'BigPlayer_video_left'} `}>
                <img src={video} alt="" ref={imgRef}/>
            </div>
        </div>
    )
}