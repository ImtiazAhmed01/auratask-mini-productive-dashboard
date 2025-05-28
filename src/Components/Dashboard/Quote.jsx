import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Quote.css';

const Star = ({ x, y, size, opacity }) => {
    return (
        <div
            className="star"
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
            }}
        />
    );
};

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stars, setStars] = useState([]);
    const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const canvasRef = useRef(null);
    const quoteRef = useRef(null);

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const fetchQuote = async (retries = 3) => {
        try {
            const res = await axios.get('http://localhost:5000/quote', {
                timeout: 5000,
            });

            if (res.data && Array.isArray(res.data) && res.data[0]?.q && res.data[0]?.a) {
                setQuote({
                    text: res.data[0].q,
                    author: res.data[0].a || 'Anonymous',
                });
            } else {
                setQuote({
                    text: "Look back to learn from your mistakes only",
                    author: 'Anonymous',
                });
            }

            setError(null);
            setIsLoading(false);
        } catch (error) {
            if (retries > 0) {
                setTimeout(() => fetchQuote(retries - 1), 500);
            } else {
                setQuote({
                    text: "Look back to learn from your mistakes only",
                    author: 'Anonymous',
                });
                setError(null);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchQuote();

        const initialStars = Array.from({ length: 50 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
        }));
        setStars(initialStars);

        const animateStars = () => {
            setStars(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    x: star.x + star.speedX + (mousePos.x - window.innerWidth / 2) * 0.002,
                    y: star.y + star.speedY + (mousePos.y - window.innerHeight / 2) * 0.002,
                }))
            );
            requestAnimationFrame(animateStars);
        };
        animateStars();

        const quoteBox = quoteRef.current;
        const handleMouseMove = (e) => {
            const rect = quoteBox.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };

        if (quoteBox) {
            quoteBox.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (quoteBox) {
                quoteBox.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [mousePos]);

    const handleRefresh = () => {
        setIsLoading(true);
        fetchQuote();
    };

    if (isLoading) {
        return <div className="text-center text-gray-600">Loading quote...</div>;
    }

    if (error) {
        return (
            <motion.div
                variants={quoteVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-4 rounded-lg shadow-md mb-6 text-center"
            >
                <p className="text-lg italic text-red-500">{error}</p>
                <button
                    onClick={handleRefresh}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Try Again
                </button>
            </motion.div>
        );
    }

    return (
        <div ref={canvasRef} className="starry-background relative min-h-screen">
            {stars.map((star, index) => (
                <Star
                    key={index}
                    x={star.x}
                    y={star.y}
                    size={star.size}
                    opacity={star.opacity}
                />
            ))}
            <motion.div
                ref={quoteRef}
                variants={quoteVariants}
                initial="hidden"
                animate="visible"
                className="quote-container border border-white p-4 rounded-lg shadow-md text-center"
            >
                <p className="text-lg italic">"{quote.text}"</p>
                <p className="text-sm text-gray-400 mt-2">— {quote.author}</p>
            </motion.div>
        </div>
    );
};

export default Quote;
