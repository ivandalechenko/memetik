import modalStore from '../../stores/modalStore';
import PlayVideoBtn from '../PlayVideoBtn/PlayVideoBtn';
import ShareBtn from '../ShareBtn/ShareBtn';
import VideoTime from '../VideoTime/VideoTime';
import './Player.scss';

import { useRef } from 'react';

export default ({ time, preview, mt, mb, bottom, center, end, big, left }) => {

    const imgRef = useRef(null);

    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        modalStore.setImg(preview);
        modalStore.setImgRect(rect);
        modalStore.changeModal();
    };

    return (
        <div className={`Player ${mt && 'Player_mt'} ${mb && 'Player_mb'} ${bottom && 'Player_bottom'} ${center && 'Player_center'} ${end && 'Player_end'} ${big && 'Player_big'} ${left && 'Player_left'}`} onClick={handleClick}>
            <div className='Player_video free_img'>
                {/* <img src="./preview.png" alt="" /> */}
                <img src={preview} alt="" ref={imgRef}/>
            </div>
            {/* <div className='Player_content'>
                <div className='Player_content_inner'></div>
                <div className='Player_content_play'>
                    <PlayVideoBtn />
                </div>
                <div className='Player_content_info'>
                    <VideoTime time={time} />
                    <ShareBtn />
                </div>
            </div> */}
        </div>
    )
}