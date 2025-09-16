import GreyText from '../../GreyText/GreyText';
import ShareBtn from '../../ShareBtn/ShareBtn';
import Title from '../../Title/Title';
import WhiteText from '../../WhiteText/WhiteText';
import './CasesProjectItem.scss';
export default ({ img, title, ath, description, onClick, width, artwork }) => {
    return (
        <>
        
            <div className={`CasesProjectItem ${artwork && 'CasesProjectItem_artwork'}`} onClick={() => {onClick(title)}}>
                <div className='CasesProjectItem_inner'>
                    <img src={img} alt="" />
                    <div className='CasesProjectItem_content'>
                        <Title title={title} start fs_55 cases/>
                        <WhiteText text={`ATH: ${ath}`} />
                        <div className='CasesProjectItem_content_text'>
                            <GreyText text={description} />
                        </div>
                    </div>
                    <div className='CasesProjectItem_btn'>
                        <ShareBtn />
                    </div>
                </div>
                <div className='CasesProjectItem_content_text_mob'>
                    <GreyText text={description} />
                </div>
            </div>
            <div className={`CasesProjectItem_mob ${artwork && 'CasesProjectItem_mob_artwork'}`}>
                {/* TASK добавить для артворка(вторых проектов) как в фигме */}
            </div>
        </>
    )
}