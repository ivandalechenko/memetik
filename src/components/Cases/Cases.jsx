import { observer } from 'mobx-react-lite';
import './Cases.scss';
import CasesHeader from './CasesHeader/CasesHeader';
import CasesProjectItem from './CasesProjectItem/CasesProjectItem';
import { useEffect, useState } from 'react';
import BackBtn from '../BackBtn/BackBtn';
import CasesImg from './CasesImg/CasesImg';

export default observer(() => {

    // const [visibleTab, setVisibleTab] = useState(CasesActiveTab.activeTab);

    const Projects = [
        {
            img: './cases/memeFi.png',
            title: 'MemeFi',
            ath: '94.229M',
            description: 'Memefi is a crypto GameFi project with CGI visuals, unique artwork, and an active Telegram app community.',
            works: [
                {
                    img: './cases/memeFi.png',
                    title: 'Artwork',
                    amount: 'Approx. 312 artworks',
                    description: '2D illustrations and mascot-style characters for branding and social media.',
                    gallery: [
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },
                        {
                            img: '/cases/memeFi.png'
                        },

                    ]
                },
                {
                    img: './cases/memeFi.png',
                    title: '3D Animations',
                    amount: 'Approx. 32 animations',
                    description: 'CGI and motion graphics for promos, ads, and community content.'
                },
                {
                    img: './cases/memeFi.png',
                    title: 'Web Design',
                    amount: '1 website + 1 Telegram app',
                    description: 'Playful landing page for the Hippo project and an interactive Telegram mini app for the community.'
                },
                {
                    img: './cases/memeFi.png',
                    title: '2D GIF Animations',
                    amount: 'Approx. 76 GIFs',
                    description: 'Looping GIF animations of the Hippo mascot for memes, stickers, and community sharing.'
                }
            ],
        },
    ]

    const Design = [
        {
            img: './cases/memeFi.png',
            title: 'MemeFiS',
            ath: '94.229M',
            description: 'Memefi is a crypto GameFi project with CGI visuals, unique artwork, and an active Telegram app community.',
            works: [
                {
                    img: './cases/memeFi.png',
                    title: 'Artwork',
                    amount: 'Approx. 312 artworks',
                    description: '2D illustrations and mascot-style characters for branding and social media.'
                },
                {
                    img: './cases/memeFi.png',
                    title: '3D Animations',
                    amount: 'Approx. 32 animations',
                    description: 'CGI and motion graphics for promos, ads, and community content.'
                },
                {
                    img: './cases/memeFi.png',
                    title: 'Web Design',
                    amount: '1 website + 1 Telegram app',
                    description: 'Playful landing page for the Hippo project and an interactive Telegram mini app for the community.'
                },
                {
                    img: './cases/memeFi.png',
                    title: '2D GIF Animations',
                    amount: 'Approx. 76 GIFs',
                    description: 'Looping GIF animations of the Hippo mascot for memes, stickers, and community sharing.'
                }
            ],
        },
    ]

    const Animations = [
        {
            img: './cases/memeFi.png',
            title: 'MemeFiSsss',
            ath: '94.229M',
            description: 'Memefi is a crypto GameFi project with CGI visuals, unique artwork, and an active Telegram app community.',
            works: [
                {
                    img: './cases/memeFi.png',
                    title: 'Artwork',
                    amount: 'Approx. 312 artworks',
                    description: '2D illustrations and mascot-style characters for branding and social media.'
                },
                {
                    img: './cases/memeFi.png',
                    title: '3D Animations',
                    amount: 'Approx. 32 animations',
                    description: 'CGI and motion graphics for promos, ads, and community content.'
                },
                {
                    img: './cases/memeFi.png',
                    title: 'Web Design',
                    amount: '1 website + 1 Telegram app',
                    description: 'Playful landing page for the Hippo project and an interactive Telegram mini app for the community.'
                },
                {
                    img: './cases/memeFi.png',
                    title: '2D GIF Animations',
                    amount: 'Approx. 76 GIFs',
                    description: 'Looping GIF animations of the Hippo mascot for memes, stickers, and community sharing.'
                }
            ],
        },
    ]

    // useEffect(() => {
    //     setVisibleTab(null);
    //     const timeout = setTimeout(() => {
    //         setVisibleTab(CasesActiveTab.activeTab);
    //     }, 300);
    //     return () => clearTimeout(timeout);
    // }, [CasesActiveTab.activeTab]);

    // const allProjects = {
    //     Projects: Projects,
    //     Design: Design,
    //     Animations: Animations,
    // };

    const allTabs = ['Projects', 'Design', 'Animations']

    const allProjects = {
        Projects,
        Design,
        Animations
    }


    const [activeTab, setactiveTab] = useState('Projects');
    const [activeProject, setactiveProject] = useState('');
    const [activeGallery, setactiveGallery] = useState('');
    const [activeGalleryProject, setactiveGalleryProject] = useState('');

    const handleClick = (tab) => {
        setactiveTab(tab);
        setactiveProject('');
        setactiveGallery('')
        setactiveGalleryProject('');
    }

    const handleClickActiveProject = (project) => {
        setactiveProject(project);
        setactiveTab('');
    }

    const backFromActiveProject = () => {
        setactiveProject('')
        setactiveTab('Projects')
    }

    const handleClickOpenGallery = (projectTitle, project) => {
        setactiveProject('');
        setactiveGalleryProject(projectTitle);
        setactiveGallery(project);
    }

    return (
        <div className='Cases'>
            <CasesHeader onClick={handleClick} selected={ activeTab } />
            <div className='Cases_content'>
                {
                    (activeProject == '' || activeGallery == '') &&
                    <div className={`Cases_content_visible${allTabs.includes(activeTab) ? ' Cases_content_visible_isVisible' : ''}`}>
                        <div className='Cases_content_top'>
                            {allProjects[activeTab]?.map((el, index) => (
                                <CasesProjectItem
                                    img={el.img}
                                    title={el.title}
                                    ath={el.ath}
                                    description={el.description}
                                    key={`CasesProjectItem_top_key_${index}`}
                                    // onClick={() => { CasesActiveTab.setActiveProject(el.title); setVisibleTab('') }}
                                    onClick={handleClickActiveProject}
                                />
                            ))}
                        </div>
                        <div className='Cases_content_down'>
                            {Projects.map((el, index) => (
                                <CasesProjectItem
                                    img={el.img}
                                    title={el.title}
                                    ath={el.ath}
                                    description={el.description}
                                    key={`CasesProjectItem_top_key_${index}`}
                                    // onClick={() => { CasesActiveTab.setActiveProject(el.title); setVisibleTab('') }}
                                    onClick={handleClickActiveProject}
                                />
                            ))}
                        </div>
                    </div>

                }
                {
                    (activeProject != '' && activeGallery == '') &&
                    <div className={`Cases_content_visible_isVisible`}>
                        <div className='Cases_content_header'>
                            <BackBtn onClick={backFromActiveProject}/>
                            {activeProject}
                        </div>
                        <>
                            <div className='Cases_content_top'>
                                {Projects
                                    .filter(el => el.title === activeProject)
                                    .map((el, index) => (
                                        <>
                                            {el.works.map((el, index) => (
                                                <CasesProjectItem
                                                img={el.img}
                                                title={el.title}
                                                ath={el.ath}
                                                description={el.description}
                                                    key={`CasesProjectItem_down_key_el_${index}`}
                                                    onClick={() => handleClickOpenGallery(activeProject, el.title)}
                                                />
                                            ))}
                                        </>
                                    ))
                                }
                            </div>
                            <div className='Cases_content_down'>
                                {Projects
                                    .filter(el => el.title === activeProject)
                                    .map((el, index) => (
                                        <>
                                            {el.works.map((el, index) => (
                                                <CasesProjectItem
                                                img={el.img}
                                                title={el.title}
                                                ath={el.ath}
                                                description={el.description}
                                                    key={`CasesProjectItem_down_key_el_${index}`}
                                                    onClick={() => handleClickOpenGallery(activeProject, el.title)}
                                                />
                                            ))}
                                        </>
                                    ))
                                }
                            </div>
                        </>
                    </div>
                }
                {
                    (activeProject == '' && activeGallery != '') &&
                    <div className={`Cases_content_visible_isVisible`}>
                        <div className='Cases_content_header'>
                            <BackBtn onClick={() => {
                                setactiveGallery('');
                                setactiveProject(activeGalleryProject);
                            }}/>
                            {activeGallery}
                        </div>
                        <>
                            <div className='Cases_content_top'>
                                {allProjects[Object.keys(allProjects).find(tab =>
                                    allProjects[tab].some(p => p.title === activeGalleryProject)
                                )]
                                    .filter(project => project.title === activeGalleryProject)
                                    .flatMap(project =>
                                        project.works
                                        .filter(work => work.title === activeGallery)
                                        .flatMap(work =>
                                            work.gallery?.map((imgObj, idx) => (
                                                <CasesImg key={idx} img={imgObj.img} />
                                            ))
                                        )
                                    )
                                }
                            </div>
                            <div className='Cases_content_down'>
                                {allProjects[Object.keys(allProjects).find(tab =>
                                    allProjects[tab].some(p => p.title === activeGalleryProject)
                                )]
                                    .filter(project => project.title === activeGalleryProject)
                                    .flatMap(project =>
                                        project.works
                                        .filter(work => work.title === activeGallery)
                                        .flatMap(work =>
                                            work.gallery?.map((imgObj, idx) => (
                                                <CasesImg key={idx} img={imgObj.img} />
                                            ))
                                        )
                                    )
                                }
                            </div>
                        </>
                    </div>
                }

            </div>
            <div className='Cases_inner'></div>
        </div>
    )
})