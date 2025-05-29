import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ParticlesComponent from './ParticlesComponent'; // adjust path if needed

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const quoteRef = useRef(null);

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const fetchQuote = async (retries = 3) => {
        try {
            const res = await axios.get('https://auratasks-mini-productive-dasboard-server.onrender.com/quote', {
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
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        fetchQuote();
    };

    if (isLoading) {
        return <div className="text-center text-gray-600 py-20">Loading quote...</div>;
    }

    return (
        <div className="relative h-[60vh] overflow-hidden rounded-lg bg-green-600">
            {/* Particle Background */}
            <div className="absolute inset-0 h-full w-full">
                <ParticlesComponent id="tsparticles" />
            </div>

            {/* Quote Box */}
            <motion.div
                ref={quoteRef}
                variants={quoteVariants}
                initial="hidden"
                animate="visible"
                className="relative  max-w-xl mx-auto mt-20 bg-white/10 backdrop-blur-md text-white border border-white p-6 rounded-lg shadow-lg text-center"
            >
                <p className="text-xl italic mb-4">"{quote.text}"</p>
                <p className="text-sm text-gray-300">— {quote.author}</p>
                <button
                    onClick={handleRefresh}
                    className="mt-6 px-4 py-2 bg-white text-purple-700 font-bold rounded hover:bg-gray-100 transition"
                >
                    New Quote
                </button>
            </motion.div>
        </div>
    );
};

export default Quote;
