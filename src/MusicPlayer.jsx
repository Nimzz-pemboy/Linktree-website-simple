import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settings } from './settings.js';

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <>
            <motion.button 
                className="fab-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <i className="fa-solid fa-music"></i>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="music-card glass-container"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="music-header">
                            <img src={settings.music.cover} alt="Cover Lagu" className="music-cover" />
                            <div className="music-info">
                                <h3>{settings.music.title}</h3>
                                <p>{settings.music.artist}</p>
                            </div>
                        </div>

                        <div className="waveform">
                            {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                                <div 
                                    key={bar} 
                                    className={`wave-bar ${isPlaying ? 'playing' : ''}`} 
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                ></div>
                            ))}
                        </div>

                        <div className="music-progress">
                            <span>{formatTime(currentTime)}</span>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                ></div>
                            </div>
                            <span>{formatTime(duration)}</span>
                        </div>

                        <button onClick={togglePlay} className="play-btn">
                            {isPlaying ? (
                                <><i className="fa-solid fa-pause" style={{ marginRight: '8px' }}></i> Stop</>
                            ) : (
                                <><i className="fa-solid fa-play" style={{ marginRight: '8px' }}></i> Play</>
                            )}
                        </button>

                        <audio 
                            ref={audioRef} 
                            src={settings.music.audio} 
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={() => setIsPlaying(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;
