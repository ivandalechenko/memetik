import './BigPlayer.scss';
export default ({ video, time, bottom, pr, left }) => {
    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'} ${pr && 'BigPlayer_pr'}`}>
            <div className={`BigPlayer_video free_img ${left && 'BigPlayer_video_left'} `}>
                <img src="./secPreview.png" alt="" />
            </div>
        </div>
    )
}