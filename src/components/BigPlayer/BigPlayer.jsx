import './BigPlayer.scss';
export default ({ video, time, bottom, pr }) => {
    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'} ${pr && 'BigPlayer_pr'}`}>
            <div className='BigPlayer_video free_img'>
                <img src="./secPreview.png" alt="" />
            </div>
        </div>
    )
}