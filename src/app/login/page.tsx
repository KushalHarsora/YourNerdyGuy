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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

// Schema of Form
const formSchema = z.object({
    email: z.string().email().min(5, {
        message: "Email Required"
    }),

    password: z.string().min(8, {
        message: "Password is Short"
    }).max(300, {
        message: "Password too long"
    })
});


const Login: React.FC = () => {

    const router = useRouter();

    // Creating initial Form and assigning default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });


    // handle Submit of Form
    const handleSubmitAction = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/auth/user/login', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = response.data
            if (response.status === 200) {
                toast.success(data.message || "Login successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });
                router.push(`/home/${data.name}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 401) {
                    toast.error(data.error || "User does not Exists", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    })
                    router.push("/register");
                } else if (status === 409) {
                    toast.error(data.error || "Invalid Credentials", {
                        invert: false,
                        duration: 2500
                    });
                    form.resetField('password');
                } else {
                    toast.error(data.error || "Some Error Occured", {
                        invert: false,
                        duration: 2500
                    });
                    form.reset();
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    invert: false,
                    duration: 2500
                });
            }
        }
    }

    return (
        <React.Fragment>
            <main>
                <section className=' w-2/5 p-[7vw] h-screen absolute left-[60vw] flex flex-col gap-12 justify-center bg-orange-50'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitAction)} className=' space-y-6'>
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
                                <span>Don&apos;t have an account?</span>
                                <Link href={'/register'}><span className=' text-black hover:text-orange-600 font-bold'>sign up</span></Link>
                            </div>
                        </form>
                    </Form>
                </section>
                <section className=' w-3/5 h-screen flex justify-center items-center'>
                    <Image src={'./login.svg'} alt={'login image'} width={0.45 * screen.width} height={0.45 * screen.height} />
                </section>
            </main>
        </React.Fragment>
    )
}

export default Login