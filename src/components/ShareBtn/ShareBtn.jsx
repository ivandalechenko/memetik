import './ShareBtn.scss';
export default ({ title }) => {
    return (
        <div className='ShareBtn'>
            {
                title && title
            }
            <img src="./ShareBtn.svg" alt="" />
        </div>
    )
}