"use client";
import data from '../data/data.json'
import Slider from '../src/components/Slider'

export default function Page() {
    return (
        <div className='flex justify-center m-24'>
            <Slider
                width={600}
                classes={'px-16 pt-6'}
                items={data.data.map(item => (
                    <div>
                        <p className='italic'>{item.type}</p>
                        <div><strong><span className='text-red-600'>{item.article}</span> {item.word}</strong></div>
                        <p className='text-green-600'>{item.example}</p>
                    </div>
                ))}
            />
        </div>
    )
}