import PlayVideoBtn from '../PlayVideoBtn/PlayVideoBtn';
import ShareBtn from '../ShareBtn/ShareBtn';
import VideoTime from '../VideoTime/VideoTime';
import './SmallPlayer.scss';
export default ({ time, preview }) => {
    return (
        <div className='SmallPlayer'>
            <div className='SmallPlayer_video free_img'>
                {/* <img src="./preview.png" alt="" /> */}
                <img src={preview} alt="" />
            </div>
            <div className='SmallPlayer_content'>
                <div className='SmallPlayer_content_inner'></div>
                <div className='SmallPlayer_content_play'>
                    <PlayVideoBtn />
                </div>
                <div className='SmallPlayer_content_info'>
                    <VideoTime time={time} />
                    <ShareBtn />
                </div>
            </div>
        </div>
    )
}