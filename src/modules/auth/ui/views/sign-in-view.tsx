"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { authClient } from '@/lib/auth-client';

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: 'Password is required' })
})

export const SignInView = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ pending, setPending ] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,

                callbackURL: '/',
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push('/');
                },
                onError: ({ error }) => {
                    setError(error.message);
                    setPending(false);
                }
            }
        );
    };

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setPending(true);

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: '/',
            },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({ error }) => {
                    setError(error.message);
                    setPending(false);
                }
            }
        );
    };

    return(
        <div className="flex flex-col gap-6 min-h-screen items-center justify-center">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
                            <div className='flex flex-col gap-6 w-90'>
                                <div className='flex flex-col items-center text-center'>
                                    <h1 className='text-2xl font-bold'>
                                        Welcome back!
                                    </h1>
                                    <p className='text-muted-foreground text-balance'>
                                        Login to your account
                                    </p>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField 
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='name@example.com'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField 
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='********'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className='bg-destructive/10 border-none'>
                                        <OctagonAlertIcon className='h-4 w-4 !text-destructive'/>
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    disabled={pending}
                                    type='submit'
                                    className='w-full'
                                >
                                    Sign In
                                </Button>
                                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                                    <span className='bg-card text-muted-foreground relative z-10 px-2'>
                                        Or continue with
                                    </span>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Button
                                        disabled={pending}
                                        onClick={() => onSocial("google")}
                                        variant="outline"
                                        type='button'
                                        className='w-full'
                                    >
                                        <FaGoogle />
                                    </Button>
                                    <Button
                                        disabled={pending}
                                        onClick={() => onSocial("github")}
                                        variant="outline"
                                        type='button'
                                        className='w-full'
                                    >
                                        <FaGithub />
                                    </Button>
                                </div>
                                <div className='text-center text-sm'>
                                    Don&apos;t have an account? {" "}
                                    <Link href="/sign-up" className='underline underline-offset-4'>
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 relative hidden lg:flex flex-col gap-y-6 items-center justify-center p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50"></div>
                        <div className="relative z-10 flex flex-col items-center gap-y-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <img src="/logo.svg" alt="Accentualizer.ai Logo" className="h-[92px] w-[92px]" />
                        </div>
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-white">Accentualizer.ai</h1>
                            <p className="text-slate-300 text-lg max-w-md">
                            Transform your communication with AI-powered accent enhancement
                            </p>
                        </div>
                        </div>

                        {/* Subtle decorative elements */}
                        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>
                    </div>
                </CardContent>
            </Card>
            <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance
            *:[a]:underline *:[a]:underline-offset-4'>
                By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>
            </div>
        </div>
    );
};