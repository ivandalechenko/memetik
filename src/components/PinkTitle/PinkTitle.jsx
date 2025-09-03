import './PinkTitle.scss';
export default ({ text, maxWidth }) => {
    return (
        <div className={`PinkTitle ${maxWidth && 'PinkTitle_maxWidth'}`}>
            {text}
        </div>
    )
}