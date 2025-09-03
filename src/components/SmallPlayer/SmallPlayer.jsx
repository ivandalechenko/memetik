import PlayVideoBtn from '../PlayVideoBtn/PlayVideoBtn';
import ShareBtn from '../ShareBtn/ShareBtn';
import VideoTime from '../VideoTime/VideoTime';
import './SmallPlayer.scss';
export default ({ time, preview, mt, mb, bottom, center, end }) => {
    return (
        <div className={`SmallPlayer ${mt && 'SmallPlayer_mt'} ${mb && 'SmallPlayer_mb'} ${bottom && 'SmallPlayer_bottom'} ${center && 'SmallPlayer_center'} ${end && 'SmallPlayer_end'}`}>
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