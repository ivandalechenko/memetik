import './styles/HeaderBurger.scss';
export default ({ isCross = true }) => {
    return (
        <div className={`HeaderBurger ${isCross && 'HeaderBurger_cross'}`}>
            <div className='HeaderBurger_line_wrapper free_img'>
                <div className='HeaderBurger_line'></div>
            </div>
            <div className='HeaderBurger_line_wrapper free_img'>
                <div className='HeaderBurger_line'></div>
            </div>
            <div className='HeaderBurger_line_wrapper free_img'>
                <div className='HeaderBurger_line'></div>
            </div>
        </div>
    )
}