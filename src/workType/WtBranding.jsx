import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"

export default () => {
    return (
        <div className='WorkType_contentCGI container'>
            <Title title={componentName.split(' ').slice(0, -1).join(' ')} start />
            <Title title={componentName.split(' ').slice(-1)[0]} start />
            <div className='WorkType_contentCGI_content WorkType_mt120'>
                <div className='WorkType_contentCGI_left'>
                    <SmallPlayer preview={'./preview.png'} />
                    <div className='WorkType_mt120'>
                        <PinkTitle text={<>Unique content<br />based on narrative<br /> of your token</>} />
                    </div>
                    <div className='WorkType_mt40'>
                        <WhiteText text={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                    </div>
                    <div className='WorkType_mt40'>
                        <ShareBtn title={'Show More'} black />
                    </div>
                </div>
                <div className='WorkType_contentCGI_right'>
                    <BigPlayer video={'./secPreview.png'} />
                    <SmallPlayer preview={'./preview.png'} />
                </div>
            </div>
        </div>
    )
}