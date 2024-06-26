'use client';
import 'regenerator-runtime/runtime';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import createSpeechServicesPonyfill from 'web-speech-cognitive-services';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import jwt from 'jsonwebtoken';
import { FaMicrophone} from 'react-icons/fa';
const SUBSCRIPTION_KEY = process.env.NEXT_PUBLIC_API_AZURE_VOICE;
const REGION = 'eastus';
const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicesPonyfill({
    credentials: {
        region: REGION,
        subscriptionKey: SUBSCRIPTION_KEY,
    }
});

const makeShareURL = (hash, name) => {
    const data = hash + ","+ name;
    const encoded = btoa(data);
    return `https://ihc-back-rvn7.onrender.com/compartir/${encoded}`;
};


const NoteViewer = () => {
    const params = useParams();
    const [titleLabel, setTitleLabel] = useState("");
    const [noteLabel, setNoteLabel] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/notes/get/description/${params.hash}/${params.name}`)
            .then((res) => res.json())
            .then((data) => {
                setTitleLabel(data.title);
                setDescription(data.description);
                setNoteLabel(decodeURIComponent(params.name));
            });
        setNoteLabel(params.name);
    }, []);
    const [isRecording, setIsRecording] = useState(false);
    const onSubmit = async (event) => {
        event.preventDefault()

        const decoded = jwt.decode(localStorage.getItem('token'));
        const formData = new FormData(event.target)
        const data = await fetch(`http://localhost:5000/notes/create/${params.hash}/${params.name}/${decoded.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        const response = await data.json();
        if (response.code !== 200) {
            return;
        }
        setDescription(response.description);
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const OnSpeechRecording = () => {
        if (!browserSupportsSpeechRecognition) {
            alert('¡Su navegador no es compatible con el software de reconocimiento de voz! Pruebe con Chrome para escritorio');
            return;
        }
        if (isRecording) {
            SpeechRecognition.abortListening();
            setIsRecording(false);
            setDescription(transcript);
            resetTranscript();
            alert('Grabación finalizada');
        } else {
            SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
            SpeechRecognition.startListening({ language: 'es-ES' });
            setIsRecording(true);
        }
    }
    return (
        <section className="container mx-auto flex flex-col md:gap-12 gap-8 p-4 md:ml-16 w-auto">
            <div className='md:w-2/3 mt-10 border-b-2 border-black/50 pb-4 text-2xl'>Bienvenido a tus apuntes</div>
            <div className='text-xl'>Inicio &gt; Apuntes &gt; {titleLabel} &gt; {noteLabel}</div>
            <div className='flex justify-end mr-1'>
            <button onClick={OnSpeechRecording} className='flex items-center justify-center gap-3 bg-gray-800 text-white py-2 rounded-full shadow w-40'>{listening ? "Grabando..." : "Voz a texto"}		<FaMicrophone size={18} /></button>
            </div>
                <form onSubmit={onSubmit}>
                    <textarea name="description" defaultValue={description} className='rounded-lg border-2 border-black/50 p-4  w-full h-auto min-h-96 outline-none' >
                    </textarea>
                </form>
                <form onSubmit={onSubmit} className='flex gap-4 justify-end'>
                    <button type="button" onClick={() => alert(makeShareURL(params.hash, params.name))} className='bg-gray-800 text-white py-2 w-[120px] rounded-full shadow  flex items-center justify-center'>Compartir</button>
                    <button type="submit" className='bg-gray-800 text-white py-2 rounded-full shadow w-[120px] flex items-center justify-center mr-1'>Guardar</button>
                </form>

        </section>
    );
}

export default NoteViewer;