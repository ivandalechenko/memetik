import './Title.scss';
export default ({ title, start }) => {
    return (
        <div className={`Title ${start && 'Title_start'}`}>
            {title}
        </div>
    )
}