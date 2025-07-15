
function createBezierEasing(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleX = t => ((ax * t + bx) * t + cx) * t;
    const sampleY = t => ((ay * t + by) * t + cy) * t;
    const sampledDerivativeX = t => (3 * ax * t + 2 * bx) * t + cx;

    // Находит параметр t по заданному x методом Ньютона + бинарного поиска
    function solveT(x) {
        let t = x, i = 0;
        for (; i < 8; i++) {
            const dx = sampleX(t) - x;
            const d = sampledDerivativeX(t);
            if (Math.abs(dx) < 1e-6) return t;
            if (Math.abs(d) < 1e-6) break;
            t -= dx / d;
        }
        let t0 = 0, t1 = 1;
        while (t0 < t1) {
            const x2 = sampleX(t);
            if (Math.abs(x2 - x) < 1e-6) return t;
            x2 > x ? t1 = t : t0 = t;
            t = (t1 + t0) / 2;
        }
        return t;
    }

    // Функция сглаживания: на входе x∈[0,1], возвращает y∈[0,1]
    return x => sampleY(solveT(x));
}

export default createBezierEasing