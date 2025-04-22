import { Feature, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Hero } from '@/components/ui/animated-hero';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [features, setFeatures] = useState<Feature[]>([]);
    const fetchFeature = async () => {
        const response = await axios.get(route('feature.get'));
        if (response.status == 200) {
            setFeatures(response.data);
        }
    }
    useEffect(() => {
        fetchFeature()
    }, []);
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[20rem] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4 border-b-2 w-full p-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <section id="section-hero" className="h-auto py-[1rem]">
                    <Hero/>
                </section>
                <section id="section-product" className="h-auto py-[1rem]">
                    <h3 className="font-bold text-3xl text-center mb-3">Our Feature</h3>
                    <div className="flex flex-row flex-wrap gap-3">
                        {features.length > 0 ?
                        features.map((feature, idx) => (
                            <Card className="w-[350px] p-3">
                                <img src={`/storage/${feature.picture}`} alt={`Image of ${feature.name}`} className="h-[15rem] rounded-md" />
                                <CardHeader>
                                    <CardTitle>{feature.name}</CardTitle>
                                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/*  */}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {/* <Button variant="outline">Cancel</Button>
                                    <Button>Deploy</Button> */}
                                </CardFooter>
                            </Card>
                        ))
                        :
                        (<>Nothing (try to add new features in admin dashboard)</>)}
                    </div>
                </section>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
