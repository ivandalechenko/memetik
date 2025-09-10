import PinkTitle from '../../components/PinkTitle/PinkTitle';
import Player from '../../components/Player/Player';
import ShareBtn from '../../components/ShareBtn/ShareBtn';
import Title from '../../components/Title/Title';
import WhiteText from '../../components/WhiteText/WhiteText';
import './WTMob.scss';
export default ({ title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {
    return (
        <div className='WTMob container'>
            <>
                <Title title={title} start />
                <Title title={title2} start />
            </>
            <PinkTitle text={pinkTitle} />
            <WhiteText text={description} />
            <ShareBtn title={cta} black />
            <div className='WTMob_img'>
                <Player preview={img1} />
                <Player preview={img2} />
                <Player preview={img3} />
            </div>
        </div>
    )
}