import GreyText from '../../GreyText/GreyText';
import ShareBtn from '../../ShareBtn/ShareBtn';
import Title from '../../Title/Title';
import WhiteText from '../../WhiteText/WhiteText';
import './CasesProjectItem.scss';
export default ({ img, title, ath, description, onClick }) => {
    return (
        <div className='CasesProjectItem' onClick={onClick}>
            <img src={img} alt="" />
            <div className='CasesProjectItem_content'>
                <Title title={title} start fs_55/>
                <WhiteText text={`ATH: ${ath}`} />
                <GreyText text={description} />
            </div>
            <div className='CasesProjectItem_btn'>
                <ShareBtn />
            </div>
        </div>
    )
}