import React from 'react';

function Checkbox(props) {

	return (
		<div {...props}>
			<input
				id={props.id}
				type="checkbox"
				value={props.value ?? 0}
				className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label htmlFor={props.id} className="ml-1 text-lg  select-none line-clamp-1 text-slate-900 dark:text-gray-900">
				{props.children}
			</label>
		</div>
	);
}

export default Checkbox;
