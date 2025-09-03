import BigPlayer from './components/BigPlayer/BigPlayer';
import PinkTitle from './components/PinkTitle/PinkTitle';
import ShareBtn from './components/ShareBtn/ShareBtn';
import SmallPlayer from './components/SmallPlayer/SmallPlayer';
import Title from './components/Title/Title';
import WhiteText from './components/WhiteText/WhiteText';
import './styles/WorkType.scss';
export default ({ componentName }) => {
    return (
        <div className='WorkType' style={{
            minHeight: '100vh',
        }}>
            {/* <Title title={'CGI/3D'} /> */}
            {
                componentName == 'CGI/3D' && 
                <div className='WorkType_contentCGI containerLeft'>
                    <Title title={componentName} start/>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_content_left'>
                            <PinkTitle text={'Unique content based on narrative of your token'} maxWidth/>
                            <WhiteText text={'You need 10 posts per day? No problem. Any request, any amount, any quality what you needGIF? ANIMATION? ILLUSTRATION? HAHAHANO PROBLEM.'} maxWidth />
                            <ShareBtn title={'Show More'} black/>
                            <SmallPlayer preview={'./preview.png'} time={'1.36'} />
                        </div>
                        <div className='WorkType_contentCGI_content_right'>
                            <BigPlayer video={'./secPreview.png'} time={'0.03'}/>
                            <SmallPlayer preview={'./thirdPreview.png'} />
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'Branding + Narrative creation' &&
                <div className='WorkType_contentCGI containerLeft'>
                    <Title title={componentName} start small/>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_content_left'>
                            <SmallPlayer preview={'./preview.png'} mt mb/>
                            <PinkTitle text={'Unique content based on narrative of your token'} maxWidth />
                            <WhiteText text={'You need 10 posts per day? No problem. Any request, any amount, any quality what you needGIF? ANIMATION? ILLUSTRATION? HAHAHANO PROBLEM.'} maxWidth />
                            <ShareBtn title={'Show More'} black/>
                        </div>
                        <div className='WorkType_contentCGI_content_right'>
                            <BigPlayer video={'./secPreview.png'} bottom/>
                            <SmallPlayer preview={'./preview.png'} bottom/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}