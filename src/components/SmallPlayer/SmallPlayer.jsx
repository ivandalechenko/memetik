import modalStore from '../../stores/modalStore';
import PlayVideoBtn from '../PlayVideoBtn/PlayVideoBtn';
import ShareBtn from '../ShareBtn/ShareBtn';
import VideoTime from '../VideoTime/VideoTime';
import './SmallPlayer.scss';

import { useRef } from 'react';

export default ({ time, preview, mt, mb, bottom, center, end }) => {

    const imgRef = useRef(null);

    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        modalStore.setImg(preview);
        modalStore.setImgRect(rect);
        modalStore.changeModal();
    };

    return (
        <div className={`SmallPlayer ${mt && 'SmallPlayer_mt'} ${mb && 'SmallPlayer_mb'} ${bottom && 'SmallPlayer_bottom'} ${center && 'SmallPlayer_center'} ${end && 'SmallPlayer_end'}`} onClick={handleClick}>
            <div className='SmallPlayer_video free_img'>
                {/* <img src="./preview.png" alt="" /> */}
                <img src={preview} alt="" />
            </div>
            {/* <div className='SmallPlayer_content'>
                <div className='SmallPlayer_content_inner'></div>
                <div className='SmallPlayer_content_play'>
                    <PlayVideoBtn />
                </div>
                <div className='SmallPlayer_content_info'>
                    <VideoTime time={time} />
                    <ShareBtn />
                </div>
            </div> */}
        </div>
    )
}