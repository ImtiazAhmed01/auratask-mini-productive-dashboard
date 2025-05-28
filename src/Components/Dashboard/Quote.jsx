import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch quote:', error.message);
            if (retries > 0) {
                setTimeout(() => fetchQuote(retries - 1), 500);
            } else {
                setError('Failed to load quote. Please try again later.');
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
        <motion.div
            variants={quoteVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-4 rounded-lg shadow-md mb-6 text-center"
        >
            <p className="text-lg italic">"{quote.text}"</p>
            <p className="text-sm text-gray-600 mt-2">— {quote.author}</p>
            {/* <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Refresh Quote
            </button> */}
        </motion.div>
    );
};

export default Quote;
