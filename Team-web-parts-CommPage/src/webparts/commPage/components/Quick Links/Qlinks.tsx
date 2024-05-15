import * as React from 'react';
import { useState, useEffect } from 'react';
import { sp } from '@pnp/sp'; // Import SharePoint PnP library
import styles from './Qlinks.module.scss';



const Qlinks: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    

    const [currentIndex, setCurrentIndex] = useState<number>(0); // Add type annotation for currentIndex

    const goToPrevSlide = () => {
        const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const handleClick1 = (): void => {
        window.location.href = 'https://www.cnexia.com/';
    };
    const handleClick2 = (): void => {
        window.location.href = 'https://eprogram.store/';
    };
    const handleClick3 = (): void => {
        window.location.href = 'https://cnexia.sharepoint.com/:b:/s/CnexiaForEveryone/ESLfth2tkatLsJWvC8FMMe4BielmFmVrUehrVKVqZIzNLQ?e=IPgauo';
    };

// -------------------------> Fetching Images from a document libray <---------------------
    useEffect(() => {
        
        const fetchImages = async () => {
            try {
                const response = await sp.web.lists.getByTitle("MediaTek").items.select('FileRef').get();
                const imageUrls = response.map(item => item.FileRef);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);
    

    
    return (
        <div className={styles.FinalePart}>
            <div className={styles.FP_left}>
                <div className={styles.ImageContainer}>
                    <div className={styles.image_holder}>
                        <img src={images[currentIndex]} alt="Slide" />
                    </div>
                    <div className={styles.Navigation_btn}>
                        <button className={styles.prevBtn} onClick={goToPrevSlide}>
                            
                            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.74178 20.4324L0.309099 14.1945C-0.103029 13.7948 -0.10303 13.2051 0.309098 12.8055L12.7412 0.749781C13.517 -0.00247461 15 0.453514 15 1.44429L15 12.1741L6.74178 20.4324Z" fill="white"/>
                            <path opacity="0.5" d="M15 14.8258L15 25.5557C15 26.5465 13.517 27.0024 12.7412 26.2502L8.08798 21.7378L15 14.8258Z" fill="white"/>
                            </svg>

                        </button>
                        <button className={styles.nextBtn} onClick={goToNextSlide}>
                            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25822 6.56763L14.6909 12.8055C15.103 13.2052 15.103 13.7949 14.6909 14.1945L2.25876 26.2502C1.48301 27.0025 4.33083e-08 26.5465 0 25.5557V14.8259L8.25822 6.56763Z" fill="white"/>
                            <path opacity="0.5" d="M4.47035e-07 12.1742L0 1.44432C-4.33083e-08 0.45354 1.48301 -0.00244924 2.25875 0.749806L6.91202 5.26216L4.47035e-07 12.1742Z" fill="white"/>
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.FP_right}>
                <div className={styles.QL_title}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.4375C6.37563 8.4375 3.4375 11.3756 3.4375 15C3.4375 18.6244 6.37563 21.5625 10 21.5625H11.25C11.7678 21.5625 12.1875 21.9822 12.1875 22.5C12.1875 23.0178 11.7678 23.4375 11.25 23.4375H10C5.3401 23.4375 1.5625 19.6599 1.5625 15C1.5625 10.3401 5.3401 6.5625 10 6.5625H11.25C11.7678 6.5625 12.1875 6.98223 12.1875 7.5C12.1875 8.01777 11.7678 8.4375 11.25 8.4375H10Z" fill="#002920"/>
                    <path d="M10.3124 14.9999C10.3124 14.4822 10.7321 14.0624 11.2499 14.0624H18.7499C19.2677 14.0624 19.6874 14.4822 19.6874 14.9999C19.6874 15.5177 19.2677 15.9374 18.7499 15.9374H11.2499C10.7321 15.9374 10.3124 15.5177 10.3124 14.9999Z" fill="#002920"/>
                    <path d="M18.75 6.5625C18.2322 6.5625 17.8125 6.98223 17.8125 7.5C17.8125 8.01777 18.2322 8.4375 18.75 8.4375H20C23.6244 8.4375 26.5625 11.3756 26.5625 15C26.5625 18.6244 23.6244 21.5625 20 21.5625H18.75C18.2322 21.5625 17.8125 21.9822 17.8125 22.5C17.8125 23.0178 18.2322 23.4375 18.75 23.4375H20C24.6599 23.4375 28.4375 19.6599 28.4375 15C28.4375 10.3401 24.6599 6.5625 20 6.5625H18.75Z" fill="#002920"/>
                    </svg>

                    <p>
                        Quick links
                    </p>
                </div>
                <div className={styles.Ql_container}>


                    <div className={styles.QL_first}>
                        
                            <button className={`${styles.BTN} ${styles.N1}`} onClick={handleClick1}>
                                cnexia.com
                            </button>
                            <button className={`${styles.BTN} ${styles.N2}`} onClick={handleClick2}>
                                Eprogram
                            </button>
                            <button className={`${styles.BTN} ${styles.N3}`} onClick={handleClick3}>
                                Welcome Book
                            </button>
                            <button className={`${styles.BTN} ${styles.N4}`}>
                                Generic Slides
                            </button>
                    </div>
                    <div className={styles.QL_second}>
                            <button className={`${styles.BTN} ${styles.N5}`}>
                                Clearview
                            </button>
                            <button className={`${styles.BTN} ${styles.N6}`}>
                                
                            </button>
                            <button className={`${styles.BTN} ${styles.N7}`}>
                                
                            </button>
                            <button className={`${styles.BTN} ${styles.N8}`}>
                                
                            </button>
                    </div>

                </div>
                

            </div>
        </div>
    );
};

export default Qlinks;
