import '../styles/WorkType.scss';

import WtBranding from './WtBranding';
import WtCGI from './WtCGI';
import WtAnimations from './WtAnimations';
import WtCases from './WtCases';
import WtMotion from './WtMotion';
import WtWeb from './WtWeb';
import WtIllustrations from './WtIllustrations';
import WtPartners from './WtPartners';


export default ({ componentName }) => {
    return (
        <>
            {
                componentName == 'Branding' && <WtBranding />
            }
            {
                componentName == 'CGI' && <WtCGI />
            }
            {
                componentName == 'Animations' && <WtAnimations />
            }
            {
                componentName == 'CASES' && <WtCases />
            }
            {
                componentName == 'Motion' && <WtMotion />
            }
            {
                componentName == 'Web' && <WtWeb />
            }
            {
                componentName == 'Illustrations' && <WtIllustrations />
            }
            {
                componentName == 'PARTNERS' && <WtPartners />
            }
        </>
    )
}