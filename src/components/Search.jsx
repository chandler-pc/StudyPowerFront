import Link from 'next/link';
import React from 'react';
import { FaMicrophone, FaSearch } from 'react-icons/fa';

function Search({ handleSubmit }) {
	return (
		/*<div className='md:w-2/3 w-full'>*/
			<div className="flex gap-2 items-center justify-center px-4 py-4 rounded-lg bg-slate-200">
				<Link href="/busqueda" title="busqueda">
					<FaSearch size={14} />
				</Link>
				<form onSubmit={handleSubmit} className="flex-1">
					<input type="text" name='search' placeholder="Búsqueda con LLM..." className="bg-transparent grow outline-none text-xl min-w-full" />
				</form>
				<button title="microphone">
					<FaMicrophone size={18} />
				</button>
			</div>
		/*</div>*/
	);
}

export default Search;
