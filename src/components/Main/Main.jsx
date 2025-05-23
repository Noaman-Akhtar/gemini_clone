import React, { useState, useContext } from 'react'
import { Context } from '../../context/context.jsx'
import './Main.css'
import { assets} from '../../assets/assets'
const Main = () => {

    const [prompt, setPrompt] = useState('');
    const { recentPrompt, prevPrompts, showing, loading, result, runPrompt } = useContext(Context);

    const handleSendPrompt = async (PromptText) => {
        const textData = PromptText || prompt;
        if (textData.trim() === " ") return;
        try {
            setPrompt('');
            await runPrompt(textData);

           
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showing ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Noaman.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleSendPrompt("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleSendPrompt("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleSendPrompt("Brainstorming team bonding activities for our work retreat")}>
                                <p>Brainstorming team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleSendPrompt("Tell me about React js and React native")}>
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className={'result-title'}>
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div  className={'result-data'}>
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: result }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text" placeholder='Enter a prompt here'
                            value={prompt} onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendPrompt();
                                }
                            }}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => handleSendPrompt()}
                                style={{ cursor: 'pointer' }} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <div  className='bottom-info'>
                    <p>Gemini may display incurrated info, including about people,so double-check its responses. Your privacy and Gemini Apps</p>
               
                    </div>                </div>
            </div>
        </div>
    )
}

export default Main
