import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Footer = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const aboutUs = () => {
        navigate("/aboutus");
    };

    return (
        <div className='text-center bg-black text-white'>
            <footer className="footer footer-center bg-black text-white rounded px-6 py-10">
                <h1 className='text-2xl sm:text-3xl font-extrabold'>AuraTasks</h1>

                <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4">
                    <button className="link link-hover" onClick={aboutUs}>About us</button>
                    <button className="link link-hover" onClick={() => setIsModalOpen(true)}>Privacy Policy</button>
                </nav>

                <nav className="mt-4">
                    <div className="flex justify-center gap-6">
                        <a href='https://www.linkedin.com/in/imtiaz-ahmed-ar/' target='_blank' rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="fill-current">
                                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56c3.97,0,7.19,2.73,7.19,8.26V39z" />
                            </svg>
                        </a>
                        <a href="https://github.com/ImtiazAhmed01" target='_blank' rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="fill-current">
                                <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25C2,35.164,8.63,43.804,17.791,46.836z" />
                            </svg>
                        </a>
                        <a href='https://www.facebook.com/imtiaz.ahmedar' target='_blank' rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                    </div>
                </nav>



                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                            <h2 className="text-xl font-bold mb-2 text-black">Privacy Policy</h2>
                            <p className="mb-4 text-black">
                                At AuraTasks, we value your privacy. This Privacy Policy outlines how we collect,
                                use, and protect your personal information when you use our services. We do not share your
                                data with third parties without your consent.
                            </p>
                            <p className="mb-4 text-black">
                                By using our website, you agree to our data collection and use policies. If you have any
                                concerns, please contact us.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </footer>
            <aside className="-mt-6 pb-8 text-sm text-center">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by the authority of AuraTasks</p>
            </aside>
        </div>
    );
};

export default Footer;
