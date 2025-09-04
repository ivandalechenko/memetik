import './CloseBtn.scss';
export default ({ onClick }) => {
    return (
        <div className='CloseBtn' onClick={onClick}>
            <img src="./close.svg" alt="" />
        </div>
    )
}