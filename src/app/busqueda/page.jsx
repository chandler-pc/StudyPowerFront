"use client";

import React, { useRef, useState } from 'react';
import Search from '@/components/Search';
import { FaCopy } from "react-icons/fa6";
import Markdown from 'react-markdown';

function SearchPage() {
    const textAreaRef = useRef(null);
    const [generatedText, setGeneratedText] = useState('');
    const handleCopyText = () => {
        if (textAreaRef.current) {
            textAreaRef.current.select();
            document.execCommand('copy');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get('search');
        setGeneratedText('Cargando...');
        fetch(`http://localhost:5000/search?q=${search}`).then((response) => {
            return response.json();
        }).then((data) => {
            setGeneratedText(data.searchResults);
        });
    };

    return (
        <section className="container mx-auto flex flex-col md:gap-12 gap-8 p-4 md:ml-16 w-auto">
            <div className='w-full mt-10 border-b-2 border-[#111827]/40 pb-4 text-xl'>Inicio &gt; Búsqueda</div>

            <div className="flex flex-col w-full items-center gap-12">
                <div className='flex flex-col p-2 md:w-4/5 w-full text-xl gap-12'>
                    <div><Search handleSubmit={handleSearch} /></div>
                    <div className="flex flex-col space-between bg-slate-200 rounded-lg md:p-6 p-3 w-full h-auto min-h-[550px]">

                        <Markdown components={{ a: props =>{
                            return <a href={props.href} target="_blank" className="text-blue-500 hover:underline">{props.children}</a>
                        }}} className='md:p-6 p-2 border-0 rounded-lg w-full text-lm
                        h-auto min-h-[500px] w-full resize-none bg-slate-200  focus:outline-none'>{generatedText}</Markdown>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCopyText}
                                className="w-fit p-2 bg-slate-200 text-bg-[#212E3F] rounded-lg hover:bg-[#212E3F] hover:text-white"
                            >
                                <FaCopy size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default SearchPage;