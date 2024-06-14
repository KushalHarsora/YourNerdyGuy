"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios
, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Interest = ({ params }: { params: { id: string } }) => {

    const router = useRouter();

    const interests = [
        "History",
        "Gaming",
        "Science", "Geography", "Music", "Sports",
        "Art", "Technology", "Cooking", "Travel", "Literature", "Photography",
        "Gardening", "Astronomy", "Fitness", "Fashion", "Writing", "Movies",
        "Theater", "Politics", "Philosophy", "Psychology", "Education", "Crafting",
        "Animal Care", "Environmentalism", "Languages", "Social Media", "DIY Projects",
        "Meditation", "Yoga", "Hiking", "Camping", "Fishing", "Bird Watching",
        "Wine Tasting", "Beer Brewing", "Collecting", "Volunteering", "Blogging",
        "Podcasting", "Home Improvement", "Interior Design", "Magic Tricks", "Public Speaking",
        "Financial Investing", "Board Games", "Martial Arts", "Robotics", "Cycling"
    ];

    const [clickedButtons, setClickedButtons] = useState<string[]>([]);

    const handleButtonClick = (interest: string) => {
        setClickedButtons(prevState => {
            if (prevState.includes(interest)) {
                return prevState.filter(button => button !== interest);
            } else {
                return [...prevState, interest];
            }
        });
    };

    const handleSubmit = async () => {
        if (clickedButtons.length < 5) {
            toast.error("Minimum 5 Fields required", {
                style: {
                    "backgroundColor": "#FADBD8",
                    "color": "black",
                    "border": "none"
                },
                duration: 2500
            })
        } else {
            const data = {
                name: params.id,
                clickedButtons
            }
            data
            const response: AxiosResponse = await axios.post('/api/auth/user/interest', {data}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.status === 200) {
                console.log(response);
            }
            toast.success("Interests Updated", {
                style: {
                    "backgroundColor": "#D5F5E3",
                    "color": "black",
                    "border": "none"
                },
                duration: 1500
            });
            router.push(`/home/${params.id}`);
        }
    }

    return (
        <React.Fragment>
            <main className='h-screen w-screen p-12 overflow-y-scroll flex flex-col items-center gap-4'>
                <section className='flex flex-col w-full justify-center items-center mb-2'>
                    <h1 className='text-xl font-bold text-orange-600'>
                        WELCOME <span className='text-black font-extrabold underline decoration-orange-600 decoration-wavy'>{params.id.toUpperCase()}</span>
                    </h1>
                    <h1 className='text-xl font-bold text-orange-600'>
                        SELECT YOUR INTERESTS
                    </h1>
                </section>
                <section className='grid grid-cols-2 gap-4 md:grid-cols-5'>
                    {interests.map((interest) => (
                        <Button
                            key={interest}
                            className={`rounded-md px-6 py-3 transition-transform transform lg:hover:scale-[1.12] 
                                ${clickedButtons.includes(interest) ? 'bg-green-500 text-white lg:hover:bg-transparent lg:hover:text-green-500 lg:hover:underline hover:decoration-wavy' : 'bg-orange-500 text-white lg:hover:text-orange-500 lg:hover:bg-transparent lg:hover:underline lg:hover:decoration-wavy'}`}
                            onClick={() => handleButtonClick(interest)}
                        >
                            {interest}
                        </Button>
                    ))}
                </section>
                <section>
                    <Button 
                        className='bg-green-500 lg:hover:bg-green-600'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </section>
            </main>
        </React.Fragment>
    );
}

export default Interest;
