import React from 'react';
import ItemTask from './ItemTask';


function ListTasks(props) {
	return (
		<table className="md:table-auto table-fixed">
			<tbody>
				{props.tasks &&
					props.tasks.map((task, index) => (
						<ItemTask key={index} task={task} className="border-b-2 border-black/5"/>
					))}
			</tbody>
		</table>
	);
}

export default ListTasks;
