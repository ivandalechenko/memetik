import './WhiteText.scss';
export default ({ text, maxWidth }) => {
    return (
        <div className={`WhiteText ${maxWidth && 'WhiteText_maxWidth'}`}>
            {text}
        </div>
    )
}