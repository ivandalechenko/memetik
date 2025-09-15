import './ShareBtn.scss';
export default ({ title, black, white, onClick, twitter, tg }) => {
    return (
        <div className={`ShareBtn ${black && 'ShareBtn_black'} ${white && 'ShareBtn_white'} ${(twitter || tg) && 'ShareBtn_social'}`} onClick={onClick}>
            {
                title && title
            }
            {/* <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2H24M24 2V23M24 2L3 23" strokeLinecap="square" className='ShareBtn_black_svg' />
            </svg> */}
            {
                !twitter && !tg &&
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2H24M24 2V23M24 2L3 23" strokeLinecap="square" className='ShareBtn_black_svg' />
                </svg>
            }
            {
                tg &&
                <svg width="26" height="26" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7891 0.814775L20.9927 22.0425C20.9927 22.0425 20.4616 23.5143 19.0024 22.8084L10.2433 15.3594L10.2026 15.3374C11.3858 14.1591 20.5605 5.00949 20.9615 4.59475C21.5822 3.95243 21.1969 3.57005 20.4761 4.05525L6.92396 13.6011L1.69555 11.6499C1.69555 11.6499 0.872756 11.3252 0.793601 10.6194C0.713404 9.91237 1.72263 9.52998 1.72263 9.52998L23.0372 0.255635C23.0372 0.255635 24.7891 -0.598095 24.7891 0.814775Z" fill="#000" />
                </svg>
            }
            {
                twitter &&
                <svg width="26" height="26" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.8054 18.8684H19.7604L7.14596 2.01943H5.04878L17.8054 18.8663V18.8684ZM19.0432 0H22.5706L14.8656 8.89568L23.9297 21H16.8331L11.2734 13.6587L4.91287 21H1.38341L9.62578 11.4863L0.929688 0H8.20814L13.2326 6.71103L19.0432 0Z" fill="#000" />
                </svg>

            }


        </div>
    )
}