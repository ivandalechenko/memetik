import './BigPlayer.scss';
export default ({ video, time, bottom, pr, left, pin }) => {
    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'} ${pr && 'BigPlayer_pr'} ${pin && 'BigPlayer_pin'}`}>
            <div className={`BigPlayer_video free_img ${left && 'BigPlayer_video_left'} `}>
                <img src="./secPreview.png" alt="" />
            </div>
        </div>
    )
}