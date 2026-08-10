import React from 'react';
import { motion } from 'framer-motion';
import { settings } from './settings.js';
import MusicPlayer from './MusicPlayer.jsx';
import './style.css';

const App = () => {
    return (
        <div className="app-wrapper">
            <video autoPlay muted loop id="bg-video">
                <source src={settings.profile.videoBg} type="video/mp4" />
            </video>

            <motion.div 
                className="glass-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.img 
                    src={settings.profile.avatar} 
                    alt="Avatar" 
                    className="avatar"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <h1 className="name">{settings.profile.name}</h1>
                <p className="bio">{settings.profile.bio}</p>

                <div className="social-links">
                    {settings.links.map((link, index) => (
                        <motion.a 
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className={link.icon} style={{ marginRight: '10px' }}></i>
                            {link.title}
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            <MusicPlayer /> 
        </div>
    );
};

export default App;
