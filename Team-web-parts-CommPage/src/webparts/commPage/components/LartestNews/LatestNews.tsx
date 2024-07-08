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
    const [showCommentPart, setShowCommentPart] = React.useState<{ [key: number]: boolean }>({});
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
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

    const handleToggleCommentPart = (newsId: number) => {
        setShowCommentPart(prevState => ({
            ...prevState,
            [newsId]: !prevState[newsId],
        }));
    };

    const handleSubmitComment = async (newsId: number) => {
        try {
            const commentText = (document.getElementById(`subject-${newsId}`) as HTMLTextAreaElement).value;
            const commentService = new CommentService();
            await commentService.postComment(commentText, newsId.toString());

            alert('Comment submitted successfully!');
            setShowCommentPart(prevState => ({
                ...prevState,
                [newsId]: false,
            }));
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment. Please try again later.');
        }
    };

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

    const [videos, setVideos] = React.useState<string[]>([]);

    useEffect(() => {
        fetchVideosFromSharePoint();
    }, []);

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
                            <div className={styles.video_holder} key={index}>
                                <video ref={videoRef} src={videoUrl} controls style={{ width: '100%', height: '100%' }} onClick={handleTogglePlay} />
                            </div>
                        ))}
                        {!isPlaying && (
                            <div className={styles.PlayBtn}>
                                <div className={styles.BTN_CIRCLE}></div>
                                <div className={styles.PlayIcon}>
                                    <button className={styles.Play} onClick={handleTogglePlay}></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.LN_right}>
                    <div className={styles.LN_title}>
                        <div className={styles.LN_icon}></div>
                        <div className={styles.LN_text}>
                            <p>Latest News</p>
                        </div>
                    </div>
                    <div className={styles.LN_Cards}>
                        <div className={styles.cards_container}>
                            {newsData.map((item, index) => (
                                <div className={styles.card} key={index}>
                                    <div className={styles.C_top}>
                                        <p>latest news</p>
                                    </div>
                                    <div className={styles.C_content}>
                                        <div className={styles.CC_title}>
                                            <p>{item.News}</p>
                                        </div>
                                        <div className={styles.CC_date}>
                                            <p>{item.Date}</p>
                                        </div>
                                        <div className={styles.CC_Content}>
                                            <p>{item.Description}</p>
                                        </div>
                                    </div>
                                    {showCommentPart[item.ID] ? (
                                        <div className={styles.CommentPart}>
                                            <textarea id={`subject-${item.ID}`} name="subject" placeholder="tapez votre commentaire.." style={{ height: '100px', fontSize: '11px' }}></textarea>
                                            <button className={styles.CommentPart_btn} onClick={() => handleSubmitComment(item.ID)}>Submit</button>
                                        </div>
                                    ) : (
                                        <div className={styles.card_button}>
                                            <a href={item.Link}>
                                                <button className={styles.CB_link}>
                                                    <div>
                                                        <p>Link</p>
                                                    </div>
                                                </button>
                                            </a>
                                            <div className={styles.CB_reactions}>
                                                <div>
                                                    <Forme context={props.context} newsId={item.ID} />
                                                </div>
                                                <div style={{ paddingRight: '5px' }}>
                                                    <button className={styles.CB_reactions_BTN} onClick={() => handleToggleCommentPart(item.ID)}>heloooo</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
