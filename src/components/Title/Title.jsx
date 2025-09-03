import './Title.scss';
export default ({ title, start, small }) => {
    return (
        <div className={`Title ${start && 'Title_start'} ${small && 'Title_small'} `}>
            {title}
        </div>
    )
}