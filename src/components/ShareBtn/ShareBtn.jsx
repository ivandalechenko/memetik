import './ShareBtn.scss';
export default ({ title, black, white, onClick }) => {
    return (
        <div className={`ShareBtn ${black && 'ShareBtn_black'} ${white && 'ShareBtn_white'}`} onClick={onClick}>
            {
                title && title
            }
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2H24M24 2V23M24 2L3 23" strokeLinecap="square" className='ShareBtn_black_svg' />
            </svg>

        </div>
    )
}