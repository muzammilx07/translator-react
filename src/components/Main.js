import React, { useEffect, useState } from 'react';
import './main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const [translation, setTranslation] = useState('');
    const [languages, setLanguages] = useState([]);
    const [selectedLanguageFrom, setSelectedLanguageFrom] = useState('en');
    const [selectedLanguageTo, setSelectedLanguageTo] = useState('id'); // Fix here
    const [inputText, setInputText] = useState('');
    console.log(translation);

    const translateText = async () => {
        if (inputText.trim() === '') {
            toast.error('Please enter some text to translate!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        const url = 'https://text-translator2.p.rapidapi.com/translate';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'f3384d0c7amshf8ebae67c1de3d7p17d3cdjsn093aa5700be2',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            body: new URLSearchParams({
                source_language: selectedLanguageFrom,
                target_language: selectedLanguageTo,
                text: inputText
            })
        };
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setTranslation(result);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f3384d0c7amshf8ebae67c1de3d7p17d3cdjsn093aa5700be2',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setLanguages(result.data.languages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLanguages();
    }, []);

    return (
        <div className="container">
            <div className="app">
            <h1>Text Translator</h1>
            <div className="language-options">
                <select value={selectedLanguageFrom} onChange={(e) => setSelectedLanguageFrom(e.target.value)}>
                    {languages.map((language, index) => (
                        <option key={index} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <span>~</span>
                <select value={selectedLanguageTo} onChange={(e) => setSelectedLanguageTo(e.target.value)}>
                    {languages.map((language, index) => (
                        <option key={index} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="textfield">
                <div className='texttxt'><textarea value={inputText} onChange={(e) => setInputText(e.target.value)} cols="30" rows="10"></textarea></div>
                <div className="response">
                <p>{translation && JSON.parse(translation).data.translatedText}</p>
                </div>
            </div>
            <button onClick={translateText}>Translate!</button>
            </div>
        </div>
    );
};

export default Main;
