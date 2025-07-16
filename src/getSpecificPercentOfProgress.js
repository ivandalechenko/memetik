const gspop = (totalProgress, start = 0, end = 1) => {
    const range = end - start;
    return Math.min(
        Math.max((totalProgress - start) / range, 0),
        1
    );
};

export default gspop;
