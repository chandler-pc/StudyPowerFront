import React from 'react';
import { PiLeafFill } from "react-icons/pi";

function LogroPreview(props) {
	return (
        <div {...props}>
            <div className='flex flex-col items-center gap-4 mb-6'>
                {props?.children}
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex gap-4 p-5 rounded-md bg-slate-300 items-center'>
                    <div className='rounded-full h-fit w-fit p-1 bg-white'>
                        <PiLeafFill size={20}/>
                    </div>
                    <p className='text-lg'>{props?.tip}</p>
                </div>
            </div>
        </div>
    );
}

export default LogroPreview;
