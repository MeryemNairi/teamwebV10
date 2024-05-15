import * as React from 'react';
import styles from './FirstBanner.module.scss';
import Motif from '../../Assets/Motif.svg';
import Illustration from '../../Assets/Illustration.svg';
import Logo from '../../Assets/Logo.svg';

const FirstBanner: React.FC = () => {
    return (
        <div className={styles.FirstBanner_container}>
            <div className={styles.FB_background}>

            </div>
            <div className={styles.FB_Motif}>
                <img src={Motif} alt="Motif" />
            </div>
            <div className={styles.FB_Illustration}>
                <img src={Illustration} alt="Illustration" />
            </div>
            <div className={styles.FB_Logo}>
                <img src={Logo} alt="Logo" />
            </div>
        </div>
    );
};

export default FirstBanner;
