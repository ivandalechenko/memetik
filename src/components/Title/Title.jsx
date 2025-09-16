import './Title.scss';
export default ({ title, start, small, mr, fs_55, cases }) => {
    return (
        <div className={`Title ${start && 'Title_start'} ${small && 'Title_small'} ${mr && 'Title_mr'} ${fs_55 && 'Title_fs_55'} ${cases && 'Title_cases'}`}>
            {title}
        </div>
    )
}