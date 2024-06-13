"use client";

import React from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Schema for Register Form
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username Required"
    }).max(300, {
        message: "Username too long"
    }),

    email: z.string().email().min(5, {
        message: "Email Required"
    }),

    password: z.string().min(8, {
        message: "Password is short. Kindly update password."
    }).max(300, {
        message: "Password limit exceeded"
    })
});

const Register = () => {

    const router = useRouter();

    // Creating initial Form and assigning default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    // handle Submit of Form
    const handleSubmitAction = async (values: z.infer<typeof formSchema>) => {
        try {
            const response: AxiosResponse = await axios.post("/api/auth/user/register", { values }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            if (response.status === 201) {
                toast.success(data.message || "Registration successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });
                router.push("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 409) {
                    toast.error(data.error || "User Already exists", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    })
                    router.push("/login");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    style: {
                        "backgroundColor": "#FADBD8",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 2500
                });
            }
        }
    }

    return (
        <React.Fragment>
            <main>
                <section className=' w-2/5 h-screen absolute left-[60vw] flex flex-col gap-12 justify-center p-[5vw] bg-orange-50 max-lg:w-screen max-lg:left-0'>
                    <div className=' w-full text-center'>
                        <h1 className=' font-bold text-2xl text-orange-600 underline decoration-wavy tracking-wide'>
                            REGISTER
                        </h1>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitAction)} className=' space-y-6'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input className=' w-full' type='text' placeholder='enter username' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className=' w-full' type='email' placeholder='enter email address' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input className=' w-full' type='password' placeholder='enter password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className=' w-full bg-orange-500 text-white hover:bg-white hover:text-orange-500' variant='default' type='submit'>Submit</Button>
                            <Separator className=' my-4' />
                            <div className=' flex justify-center gap-6'>
                                <span>Already have an account?</span>
                                <Link href={'/login'}><span className=' text-black hover:text-orange-600 font-bold'>sign in</span></Link>
                            </div>
                        </form>
                    </Form>
                </section>
                <section className=' w-3/5 h-screen flex justify-center items-center max-lg:hidden'>
                    {typeof window !== 'undefined' && (
                        <Image
                            src={'./register.svg'}
                            alt={'register image'}
                            width={0.45 * window.screen.width}
                            height={0.45 * window.screen.height}
                        />
                    )}
                </section>
            </main>
        </React.Fragment>
    );
}

export default Register;