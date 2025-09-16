import './BackBtn.scss';
export default ({ onClick, cases }) => {
    return (
        <div className={`BackBtn ${cases && 'BackBtn_cases'}`} onClick={onClick}>
            <svg width="19" height="32" viewBox="0 0 19 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 28.5L2.99987 15.9999L15.5 3.49975" stroke="#1E1626" stroke-width="4" stroke-linecap="square"/>
            </svg>
            Back
        </div>
    )
}