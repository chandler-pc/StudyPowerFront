'use client';
import React, { useEffect, useState } from 'react';
import Search from '@/components/Search';
import TipPreview from '@/components/TipPreview';
import ListTasks from '@/components/ListTasks';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import Notification from '@/components/Notification';
import { useRouter } from 'next/navigation'
import { MiniCalendar } from '@/components/MiniCalendar';
function DashboardPage() {
	//const tips = await getTips();
	//const tasks = await getTasks(1806);
	//const lastTasks = tasks.splice(-3);
	const [tip1, setTip1] = useState("");
	const [tasks, setTasks] = useState([]);
	const [lastTasks, setLastTasks] = useState([]);
	const [phrase, setPhrase] = useState("");
	const [notificationVisible, setNotificationVisible] = useState(false);
	/*const [notificationVisible, setNotificationVisible] = useState(true);*/
	useEffect(() => {
		const decoded = jwt.decode(localStorage.getItem('token'));
		fetch('http://localhost:5000/tips').then(res => res.json()).then(data => setTip1(data.tip));
		fetch('http://localhost:5000/tips/phrase').then(res => res.json()).then(data => setPhrase(data.phrase));
		fetch(`http://localhost:5000/tasks/${decoded.id}`).then((response) => response.json())
			.then((data) => {
				setTasks(data);
				setLastTasks(data.splice(-3));
			});
	}, []);
	const router = useRouter();
	const navigateToTasks = () => {
		router.push('/tareas');
	}
	return (
		<section className="container mx-auto flex flex-col md:gap-12 gap-4 p-4 md:mt-8">

			<div className="flex md:flex-row flex-col items-center gap-4 ">
				{notificationVisible && (
					<div>
						<Notification message="This is a notification" onClose={() => setNotificationVisible(false)} />
					</div>
				)}
				<h2 className="text-3xl font-bold md:w-1/3 w-full pl-1">Bienvenido a StudyPower</h2>
				<div className="md:w-2/3 w-full">
					<Search />
				</div>
			</div>
			<div className="flex md:flex-row flex-col gap-4">
				<div className="flex flex-col gap-4 md:w-1/3 w-full">
					<Link href="/calendario">
						<div className="w-full h-[400px] rounded-lg bg-slate-200">
							<MiniCalendar />
						</div>
					</Link>
					<Link href="/asistente">
						<TipPreview tip={tip1} className="p-6  rounded-lg bg-slate-200">
							<FaStar size={48} />
							<p className="text-center text-lg">{phrase}</p>
							<h2 className='mt-2 text-base text-left w-full'>Tips:</h2>
						</TipPreview>
					</Link>
				</div>
				<div className="flex flex-col gap-4 md:w-2/3 w-full">
					<div className="flex flex-col gap-7 p-8 rounded-lg bg-slate-200">
						<p className='text-2xl'>Próximas tareas:</p>
						<ListTasks tasks={lastTasks} />
						<button onClick={navigateToTasks} className="px-6 py-2 mt-1 rounded-full w-fit bg-[#212E3F] text-white hover:bg-[#212E3F]/80 text-lm">Agregar tareas</button>
					</div>
					<Link href="/notas">
						<div className="w-full md:h-[185px] h-[140px] rounded-lg bg-slate-200 relative flex items-center ">
							<p className="ml-10 text-2xl pl-1">Apuntes</p>
							<span className="triangle-right"></span>
						</div>
					</Link>
					<Link href="/resumen">
						<div className="w-full md:h-[185px] h-[140px] rounded-lg bg-slate-200 relative flex items-center ">
							<p className="ml-10 text-2xl pl-1">Resúmenes con LLM</p>
							<span className="triangle-right"></span>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}


export default DashboardPage;
