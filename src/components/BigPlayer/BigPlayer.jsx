import './BigPlayer.scss';
export default ({ video, time, bottom }) => {
    return (
        <div className={`BigPlayer ${bottom && 'BigPlayer_bottom'}`}>
            <div className='BigPlayer_video free_img'>
                <img src="./secPreview.png" alt="" />
            </div>
        </div>
    )
}