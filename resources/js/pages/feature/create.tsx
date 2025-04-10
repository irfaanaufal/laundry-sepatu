import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { z } from 'zod';
import { createFeatureSchema } from './validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { toast } from 'sonner';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature',
        href: '/feature/list',
    },
    {
        title: 'Create Feature',
        href: '/feature/create',
    },
];

export default function CreateFeaturePage({
        title
    }: {
        title: string;
    }) {
    // const [roles, setRoles] = useState<Role[]>([]);
    // const fetchRoles = async () => {
    //     const response = await axios.get(route('role.get'));
    //     if (response.status == 200) {
    //         setRoles(response.data);
    //     }
    // }
    type FeatureFormValue = z.infer<typeof createFeatureSchema>;
    const defaultValueUserForm: Partial<FeatureFormValue> = {
        name: undefined,
        description: undefined,
        price: undefined,
        picture: undefined
    };
    const featureForm = useForm<FeatureFormValue>({
        resolver: zodResolver(createFeatureSchema),
        defaultValues: defaultValueUserForm
    });
    // useEffect(() => {
    //     fetchRoles()
    // }, []);

    const onSubmit = async (data: FeatureFormValue) => {
        // console.log(data);
        try {
            const response = await axios.post(route('feature.store'), data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });
            if (response.status == 200) {
                toast(response.data.message);
            }
            if (response.status != 200) {
                throw(`Error`);
            }
            setTimeout(() => {
                window.location.href = '/feature/list';
            }, 3000);
        } catch (error) {
            toast(error as string)
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-3">
                    <div className="w-auto lg:w-1/2 md:w-3/4">
                        <h1 className='font-extrabold text-xl mb-3'>Feature Create Form</h1>
                        <Form {...featureForm}>
                            <form onSubmit={featureForm.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={featureForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="input feature names" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is feature public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={featureForm.control}
                                    name="description"
                                    render={({ field: { value, ...fieldProps } }) => (
                                        <FormItem>
                                            <FormLabel>Feature Description</FormLabel>
                                            <FormControl>
                                                <ReactQuill {...fieldProps} theme="snow" value={value} className="mb-[2.5rem]" />
                                            </FormControl>
                                            <FormDescription>
                                                This is feature public display description.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={featureForm.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="100000" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is feature public display price.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={featureForm.control}
                                    name="picture"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem>
                                            <FormLabel>Picture</FormLabel>
                                            <Input type='file' {...fieldProps} onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                onChange(file)
                                            }} />
                                            <FormDescription>
                                                Only image with format jpg, png, and jpeg are supported.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={featureForm.formState.isSubmitting}>Submit</Button>
                                    <Link href="/feature/list">
                                        <Button type="button" className="bg-red-500 hover:bg-red-600">Cancel</Button>
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
