'use client';
import { useState, useRef } from 'react';
import { FaArrowRight, FaPaperclip } from 'react-icons/fa';
import CustomSlider from '@/components/CustomSlider';

export default function Summarypage() {
    const [data, setData] = useState('');
    const [afterSummaryVisibility, setAfterSummaryVisibility] = useState(true);
    const [summaryVisibility, setSummaryVisibility] = useState(false);
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = await fetch('http://localhost:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        const response = await data.json();
        setData(response.summary);
        setAfterSummaryVisibility(false);
        setSummaryVisibility(true);
    }
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        const textarea = textareaRef.current;
        setText(e.target.value);
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight - 50 + 'px';
    };

    const [value, setValue] = useState(50);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <section className="container mx-auto flex flex-col gap-8 p-4 md:ml-16 w-auto">
        <div className='md:w-full mt-10 border-b-2 border-[#111827]/40 pb-4 text-xl'>Inicio &gt; Resumen</div>
            <div className="flex flex-col w-full justify-center items-center gap-10">
                {afterSummaryVisibility && <div className='flex flex-col p-2 md:w-4/5 items-center w-full text-xl gap-1'>
                    <h1 className="text-3xl font-bold text-center">Resumen</h1>
                    <p className="text-lg text-center">Haz el resumen de un texto o archivo</p>
                   
                    <div className="mt-10 flex flex-col rounded-lg  w-full h-auto min-h-[450px]">
                        <form onSubmit={onSubmit}>
                        <div className="flex flex-col space-between bg-slate-200 border-2 border-[#111827]/40 rounded-lg md:p-6 p-3 w-full h-auto min-h-[470px] gap-4">
                                <textarea
                                    ref={textareaRef}
                                    name="text"
                                    value={text}
                                    onChange={handleInputChange}
                                    className="md:p-6 p-2 rounded-lg w-full text-lm
                                    h-auto min-h-[400px] w-full resize-none bg-slate-200  focus:outline-none "
                                    placeholder="|"
                                    style={{ overflow: 'hidden' }}
                                ></textarea>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="file-upload"
                                        className="flex items-center bg-[#111827]/3 text-[#212E3F] px-4 py-2 rounded-full hover:bg-[#111827]/10 transition-colors cursor-pointer"
                                        >
                                        <FaPaperclip className="mr-2" />
                                            Adjuntar archivo
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="bg-[#212E3F] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#212E3F]/80 transition-colors">
                                        <FaArrowRight />
                                    </button>
                                    
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-6'>
                            <input 
                                type="hidden" 
                                name="percentage" 
                                value={value}
                                className="" 
                                placeholder={value}
                                />
                            <p className='p-5'>Porcentaje de resumen: {value}</p>
                            <CustomSlider name="percentage" onChange={handleSliderChange} />
                            </div>
                            
                        </form>
                    </div>



                </div>
                }
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-10">
                {summaryVisibility && <div className='flex flex-col p-2 md:w-4/5 items-center w-full text-xl gap-1'>
                    <h1 className="text-3xl font-bold">Resumen</h1>
                    <div className="mt-10 flex flex-col border-2 border-[#111827]/40 bg-slate-200 rounded-lg md:p-6 p-3 w-full h-auto min-h-[450px]">
                        <div className="bg-slate-200  rounded-lg md:p-6 p-3 w-full gap-4 h-auto min-h-[440px]">
                            {data}
                        </div>
                    </div>
                    <div className="md:mt-6 mt-4 flex flex-col md:flex-row w-full md:justify-end justify-center items-center gap-4 ">
                        <button
                            onClick={() => {
                                setAfterSummaryVisibility(true);
                                setSummaryVisibility(false);
                            }}
                            className="w-[220px] py-2 mt-3 bg-gray-900 text-white rounded-full text-lg transition-all hover:bg-gray-800 focus:outline-none">
                            Crear nuevo resumen
                        </button>
                    </div>
                </div>
                }
        
            </div>
        </section>
        
    );
}