import '../styles/WorkType.scss';

import WtBranding from './WtBranding';
import WtCGI from './WtCGI';
import WtAnimations from './WtAnimations';
import WtCases from './WtCases';
import WtMotion from './WtMotion';
import WtWeb from './WtWeb';
import WtIllustrations from './WtIllustrations';
import WtPartners from './WtPartners';


export default ({ componentName, from = "", to = "" }) => {
    return (
        <>
            {
                componentName == 'Branding' && <WtBranding from={from} to={to} />
            }
            {
                componentName == 'CGI' && <WtCGI from={from} to={to} />
            }
            {
                componentName == 'Animations' && <WtAnimations from={from} to={to} />
            }
            {
                componentName == 'CASES' && <WtCases />
            }
            {
                componentName == 'Motion' && <WtMotion from={from} to={to} />
            }
            {
                componentName == 'Web' && <WtWeb from={from} to={to} NoPb/>
            }
            {
                componentName == 'Illustrations' && <WtIllustrations from={from} to={to} NoPb/>
            }
            {
                componentName == 'PARTNERS' && <WtPartners />
            }
        </>
    )
}