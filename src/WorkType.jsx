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
            {
                // DONE
                componentName == 'CGI/3D' && 
                <div className='WorkType_contentCGI container'>
                    <Title title={componentName} start/>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left '>
                            <PinkTitle text={'Unique content based on narrative of your token'} maxWidth/>
                            <WhiteText text={<>You need 10 posts per day? No problem. <br/> Any request, any amount, any quality what you need <br />GIF? ANIMATION? ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            <ShareBtn title={'Show More'} black/>
                            <SmallPlayer preview={'./preview.png'} time={'1.36'}/>
                        </div>
                        <div className='WorkType_contentCGI_rigth'>
                            <BigPlayer video={'./secPreview.png'} time={'0.03'}/>
                            <SmallPlayer preview={'./thirdPreview.png'} />
                        </div>
                    </div>
                </div>
            }
            {
                // DONE
                componentName == 'Branding + Narrative creation' &&
                <div className='WorkType_contentCGI container'>
                    <Title title={componentName.split(' ').slice(0, -1).join(' ')} start/>
                    <Title title={componentName.split(' ').slice(-1)[0]} start/>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <SmallPlayer preview={'./preview.png'} mt mb />
                            <PinkTitle text={<>Unique content<br />based on narrative<br /> of your token</>} />
                            <WhiteText text={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>}/>
                            <ShareBtn title={'Show More'} black/>
                        </div>
                        <div className='WorkType_contentCGI_rigth'>
                            <BigPlayer video={'./secPreview.png'} />
                            <SmallPlayer preview={'./preview.png'} />
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'Animations' &&
                <div className='WorkType_contentCGI container'>
                    <Title title={'Animations'} start/>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <PinkTitle text={'Unique content based on narrative of your token'} maxWidth />
                            <BigPlayer video={'./preview.png'}/>
                            <SmallPlayer preview={'./preview.png'} end/>
                        </div>
                        <div className='WorkType_contentCGI_rigth WorkType_contentCGI_rigth_close'>
                            <SmallPlayer preview={'./preview.png'} mb/>
                            <WhiteText text={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            <ShareBtn title={'Show More'} black/>
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'CASES' && 
                <div className='WorkType_cases'>
                    <div className='WorkType_cases_decor free_img'>
                        <img src="./casesBack.png" alt="" />
                    </div>
                    <div className='WorkType_cases_content leftContainer'>
                        <Title title={'Cases'} start/>
                        <PinkTitle text={<>Stories worth <br /> showing</>} maxWidth />
                        <WhiteText text={<>From bold concepts to final delivery, <br /> we’ve crafted campaigns, designed worlds, <br /> and built products that speak for themselves. <br /> Ideas? Turned real. <br /> Design? Sharp. <br /> Impact? Measurable.</>} />
                        <ShareBtn title={'See cases'} black/>
                    </div>
                </div>
            }
            {
                componentName == 'Motion design' &&
                <div className='WorkType_contentCGI container'>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <BigPlayer video={'./preview.png'}/>
                            <PinkTitle text={<>Unique content<br /> based on narrative <br /> of your token</>} maxWidth />
                            <WhiteText text={<>You need 10 posts per day? No problem.<br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            <ShareBtn title={'Show more'} black/>
                        </div>
                        <div className='WorkType_contentCGI_rigth WorkType_contentCGI_rigth_close'>
                            <Title title={'Motion design'} />
                            <BigPlayer video={'./preview.png'}/>
                            <SmallPlayer preview={'./preview.png'} end/>
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'Web/App Design + development' &&
                <div className='WorkType_contentCGI container'>
                    <Title title={componentName.split(' ').slice(0, -1).join(' ')} mr/>
                    <Title title={componentName.split(' ').slice(-1)[0]} />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <BigPlayer video={'./preview.png'}/>
                            <SmallPlayer preview={'./preview.png'} end/>
                        </div>
                        <div className='WorkType_contentCGI_rigth WorkType_contentCGI_rigth_close'>
                            <PinkTitle text={<>Unique content<br /> based on narrative <br /> of your token</>} maxWidth />
                            <WhiteText text={<>You need 10 posts per day? No problem.<br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            <ShareBtn title={'Show more'} black/>
                            <SmallPlayer preview={'./preview.png'} start/>
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'Illustrations + stickers + banners' &&
                <div className='WorkType_contentCGI container'> 
                    <Title title={componentName.split(' ').slice(0, 1).join(' ')} mr/>
                    <Title title={componentName.split(' ').slice(1, 5).join(' ')} />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <SmallPlayer preview={'./preview.png'} start/>
                            <PinkTitle text={<>Unique content<br /> based on narrative <br /> of your token</>} maxWidth />
                            <WhiteText text={<>You need 10 posts per day? No problem.<br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            <ShareBtn title={'Show more'} black/>
                        </div>
                        <div className='WorkType_contentCGI_rigth WorkType_contentCGI_rigth_close'>
                            <BigPlayer video={'./preview.png'}/>
                            
                            <SmallPlayer preview={'./preview.png'} start/>
                        </div>
                    </div>
                </div>
            }
            {
                componentName == 'PARTNERS' && 
                <div className='WorkType_cases'> 
                    <div className='WorkType_cases_decor WorkType_cases_decor_partners free_img'>
                        <img src="./partnersBack.png" alt="" />
                    </div>
                    <div className='WorkType_cases_content leftContainer'>
                        <Title title={'PARTNERS'} start/>
                        <PinkTitle text={<>Collabs that <br /> actually mattered</>} maxWidth />
                        <WhiteText text={<>We’ve worked with projects, <br /> brands, and communities across Web2 & Web3.<br /> Built campaigns, crafted content, launched things loud.<br /> Strategy? Check.<br /> Design? Always.<br /> Execution? Non-stop.</>} />
                    </div>
                </div>
            }
        </div>
    )
}