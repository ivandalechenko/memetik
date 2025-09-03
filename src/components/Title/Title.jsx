import './Title.scss';
export default ({ title, start, small, mr }) => {
    return (
        <div className={`Title ${start && 'Title_start'} ${small && 'Title_small'} ${mr && 'Title_mr'} `}>
            {title}
        </div>
    )
}