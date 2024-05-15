import * as React from 'react';
import styles from './LatestNews.module.scss';

import Forme from './Likes/Forme';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { NewsItem, fetchLatestNewsData } from './Fetchdata/FetchData';
import { useEffect, useState } from 'react';
import CommentService from './CommentService/CommentService';


interface ILatestNewsProps {
    context: WebPartContext;
    
}

const LatestNews: React.FC<ILatestNewsProps> = (props: ILatestNewsProps) => {

    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const [showCommentPart, setShowCommentPart] = React.useState<boolean>(false);
    const [newsData, setNewsData] = useState<NewsItem[]>([])
   
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play();
        } else if (!isPlaying && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

   
    //-------------------------------> the logic for the comment part <------------------------------
    const handleToggleCommentPart = () => {
        setShowCommentPart(!showCommentPart);
    };


    const handleSubmitComment = async () => {
        try {
            // Get the comment text from the textarea
            const commentText = (document.getElementById('subject') as HTMLTextAreaElement).value;
            // Create an instance of the CommentService class
            const commentService = new CommentService();
            // Post the comment using the comment service
            await commentService.postComment(commentText);
    
            // Show system message (you can customize this according to your UI)
            alert('Comment submitted successfully!');
    
            // Reset the comment part
            setShowCommentPart(false);
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle error (you can show an error message to the user)
            alert('Failed to submit comment. Please try again later.');
        }
    };
    
    //-------------------------------> Importing the video from the Document Library in sharepoint <----------------

    const [videos, setVideos] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetchVideosFromSharePoint();
    }, []);

    const fetchVideosFromSharePoint = async () => {
        try {
            const response = await fetch(
                `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('CommVideos')/items?$select=FileRef`,
                {
                    headers: {
                        Accept: 'application/json;odata=nometadata',
                    },
                }
            );
            const data = await response.json();
            const videoUrls = data.value.map((item: any) => item.FileRef);
            setVideos(videoUrls);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

 //------------------------------->Fetching  Latest News Data <----------------

 useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLatestNewsData();
      setNewsData(data);
    };
    fetchData();
  }, []);

    

    return (
        
        <div className={styles.LatestNews}>
            <div className={styles.LatestNews_container}>
                
            <div className={styles.LN_left}>
                    <div className={styles.video_container}>
                    {videos.map((videoUrl, index) => (
                        <div className={styles.video_holder}>
                        
                            <video ref={videoRef}  src={videoUrl} controls style={{width:'100%', height:'100%'}} onClick={handleTogglePlay} />
                        </div>
                    ))}
                        {!isPlaying && (
                            <div className={styles.PlayBtn}>
                                <div className={styles.BTN_CIRCLE}></div>
                                <div className={styles.PlayIcon}>
                                    <button className={styles.Play} onClick={handleTogglePlay}>
                                        
                                        <svg width="49" height="55" viewBox="0 0 49 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M47.3047 25.8401C49.2907 27.0187 49.2561 29.9052 47.2424 31.0359L5.42737 54.5145C3.41368 55.6452 0.93115 54.172 0.958814 51.8627L1.53327 3.91052C1.56093 1.60128 4.07804 0.187951 6.06407 1.36653L47.3047 25.8401Z" fill="#58C1A3"/>
                                        </svg>




                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className={styles.LN_right}>
                    <div className={styles.LN_title}>
                        <div className={styles.LN_icon}>
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75C14.9812 13.75 13.75 14.9812 13.75 16.5C13.75 18.0188 14.9812 19.25 16.5 19.25Z" fill="#002920"/>
                            <g opacity="0.4">
                            <path d="M7.51697 6.03901C7.9193 6.44214 7.91865 7.09509 7.51552 7.49742C5.20743 9.8009 3.78125 12.9829 3.78125 16.5C3.78125 20.0581 5.241 23.2735 7.59692 25.583C8.00363 25.9817 8.01012 26.6346 7.61142 27.0413C7.21271 27.4481 6.55979 27.4545 6.15308 27.0558C3.41776 24.3744 1.71875 20.6346 1.71875 16.5C1.71875 12.4132 3.37866 8.71212 6.05856 6.03756C6.46169 5.63523 7.11464 5.63588 7.51697 6.03901Z" fill="white"/>
                            <path d="M25.5975 6.13854C26.0043 5.73983 26.6572 5.74632 27.0559 6.15303C29.6685 8.81815 31.2812 12.4717 31.2812 16.5C31.2812 20.5761 29.63 24.2685 26.9624 26.9414C26.5601 27.3445 25.9071 27.3452 25.504 26.9428C25.1009 26.5405 25.1002 25.8876 25.5025 25.4844C27.8 23.1824 29.2188 20.0078 29.2188 16.5C29.2188 13.0332 27.8331 9.89207 25.5831 7.59687C25.1844 7.19016 25.1908 6.53724 25.5975 6.13854Z" fill="white"/>
                            </g>
                            <g opacity="0.8">
                            <path d="M11.4252 10.2954C11.8144 10.7112 11.7927 11.3638 11.3769 11.753C10.0721 12.974 9.28125 14.644 9.28125 16.4755C9.28125 18.3283 10.0907 20.0162 11.4229 21.2408C11.8422 21.6262 11.8697 22.2786 11.4842 22.6979C11.0988 23.1172 10.4464 23.1447 10.0271 22.7592C8.30455 21.1758 7.21875 18.9508 7.21875 16.4755C7.21875 14.0291 8.27954 11.8267 9.96759 10.247C10.3834 9.85787 11.036 9.87951 11.4252 10.2954Z" fill="#002920"/>
                            <path d="M21.6465 10.3477C22.0401 9.93607 22.6929 9.92156 23.1045 10.3152C24.7507 11.8898 25.7812 14.0643 25.7812 16.4755C25.7812 18.9156 24.726 21.1129 23.0456 22.6916C22.6305 23.0816 21.9779 23.0613 21.5879 22.6462C21.1979 22.2311 21.2183 21.5785 21.6333 21.1885C22.932 19.9684 23.7188 18.3023 23.7188 16.4755C23.7188 14.6701 22.9503 13.0218 21.6789 11.8057C21.2673 11.412 21.2528 10.7592 21.6465 10.3477Z" fill="#002920"/>
                            </g>
                            </svg>

                        </div>
                        <div className={styles.LN_text}>
                            <p>Latest News</p>
                        </div>
                    </div>
                    <div className={styles.LN_Cards}>
                        <div className={styles.cards_container}>

                        {newsData.map((item, index) => (
                            <div className={styles.card}>
                                <div className={styles.C_top}>
                                    <p>latest news</p>
                                </div>
                                <div className={styles.C_content}>
                                    <div className={styles.CC_title}>
                                        <p>
                                        {item.News}
                                        </p>
                                    </div>
                                    <div className={styles.CC_date}>
                                        <p>
                                            {item.Date}
                                        </p>
                                    </div>
                                    <div className={styles.CC_Content}>
                                        <p>
                                            {item.Description}
                                        </p>
                                    </div>
                                </div>
                                {showCommentPart ? (
                                        <div className={styles.CommentPart}>
                                            <textarea id="subject" name="subject" placeholder="tapez votre commentaire.." style={{ height: '100px', fontSize: '11px'}}></textarea>
                                            <button className={styles.CommentPart_btn}  onClick={handleSubmitComment}>Submit</button>
                                        </div>
                                    ) : (
                                <div className={styles.card_button}>

                                
                                   <a href={item.Link}> <button className={styles.CB_link}>
                                        <div>
                                                <p>Link</p>
                                        </div>
                                        <div>
                                                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.5">
                                                <path d="M4.68323 1.03993C2.82925 1.03993 1.32631 2.54287 1.32631 4.39685C1.32631 6.25082 2.82925 7.75377 4.68323 7.75377H5.32264C5.58749 7.75377 5.8022 7.96847 5.8022 8.23333C5.8022 8.49818 5.58749 8.71289 5.32264 8.71289H4.68323C2.29954 8.71289 0.367188 6.78053 0.367188 4.39685C0.367188 2.01317 2.29954 0.0808105 4.68323 0.0808105H5.32264C5.58749 0.0808105 5.8022 0.295517 5.8022 0.56037C5.8022 0.825224 5.58749 1.03993 5.32264 1.03993H4.68323Z" fill="#FEC46D"/>
                                                <path d="M9.15912 0.0808105C8.89426 0.0808105 8.67956 0.295517 8.67956 0.56037C8.67956 0.825224 8.89426 1.03993 9.15912 1.03993H9.79853C11.6525 1.03993 13.1554 2.54287 13.1554 4.39685C13.1554 6.25082 11.6525 7.75377 9.79853 7.75377H9.15912C8.89426 7.75377 8.67956 7.96847 8.67956 8.23333C8.67956 8.49818 8.89426 8.71289 9.15912 8.71289H9.79853C12.1822 8.71289 14.1146 6.78053 14.1146 4.39685C14.1146 2.01317 12.1822 0.0808105 9.79853 0.0808105H9.15912Z" fill="#FEC46D"/>
                                                </g>
                                                <path d="M4.84277 4.3968C4.84277 4.13194 5.05748 3.91724 5.32233 3.91724H9.15881C9.42366 3.91724 9.63837 4.13194 9.63837 4.3968C9.63837 4.66165 9.42366 4.87636 9.15881 4.87636H5.32233C5.05748 4.87636 4.84277 4.66165 4.84277 4.3968Z" fill="#FEC46D"/>
                                                </svg>

                                        </div>
                                        
                                    </button></a>
                                    

                                    <div className={styles.CB_reactions}>
                                        <div>
                                            
                                            <Forme context={props.context} newsId={item.ID}  />

                                        </div>
                                        <div style={{paddingRight:'5px'}}>   
                                            <button className={styles.CB_reactions_BTN} onClick={handleToggleCommentPart}>
                                                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0004 1.66669C8.90603 1.66669 7.82239 1.88224 6.81135 2.30102C5.8003 2.71981 4.88164 3.33364 4.10782 4.10746C2.54502 5.67027 1.66704 7.78988 1.66704 10C1.65976 11.9243 2.32604 13.7905 3.55038 15.275L1.88371 16.9417C1.76808 17.0589 1.68975 17.2077 1.6586 17.3693C1.62746 17.531 1.64489 17.6983 1.70871 17.85C1.77792 18 1.89013 18.126 2.03108 18.212C2.17203 18.2981 2.33538 18.3403 2.50038 18.3334H10.0004C12.2105 18.3334 14.3301 17.4554 15.8929 15.8926C17.4557 14.3298 18.3337 12.2102 18.3337 10C18.3337 7.78988 17.4557 5.67027 15.8929 4.10746C14.3301 2.54466 12.2105 1.66669 10.0004 1.66669ZM10.0004 16.6667H4.50871L5.28371 15.8917C5.43892 15.7356 5.52604 15.5243 5.52604 15.3042C5.52604 15.084 5.43892 14.8728 5.28371 14.7167C4.19253 13.6267 3.51302 12.1921 3.36095 10.6573C3.20888 9.12256 3.59366 7.58253 4.44973 6.29962C5.3058 5.01672 6.5802 4.07032 8.05581 3.62166C9.53141 3.17301 11.1169 3.24986 12.5422 3.83911C13.9675 4.42837 15.1444 5.49358 15.8724 6.85326C16.6004 8.21294 16.8344 9.78297 16.5346 11.2959C16.2349 12.8087 15.4198 14.1709 14.2283 15.1502C13.0369 16.1295 11.5427 16.6655 10.0004 16.6667Z" fill="white"/>
                                                </svg>
                                            </button>


                                        </div>
                                    </div>
                                </div> )}
                            </div>
                        ))} 

                            

                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestNews;



