'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function SharePage() {
    const { encoded } = useParams();
    const [description, setDescription] = useState("");
    const [titleLabel, setTitleLabel] = useState("");
    
    useEffect(() => {
        const decoded = atob(decodeURIComponent(encoded));
        const [hash, name] = decoded.split(",");
        fetch(`http://localhost:5000/notes/get/description/${hash}/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setDescription(data.description);
                setTitleLabel(data.name);
            });
    });

    return (
        <div>
            <p>{titleLabel}</p>
            <br/>
            <p>{description}</p>
        </div>
	);
}

export default SharePage;