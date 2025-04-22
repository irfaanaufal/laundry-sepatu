import AppLayout from '@/layouts/app-layout';
import { Feature, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { z } from 'zod';
import { editFeatureSchema } from './validation';
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
        title: 'Edit Feature',
        href: '/feature/edit',
    },
];

export default function EditFeaturePage({
        title,
        feature
    }: {
        title: string;
        feature: Feature;
    }) {
    type FeatureFormValue = z.infer<typeof editFeatureSchema>;
    const defaultValueUserForm: Partial<FeatureFormValue> = {
        name: feature?.name,
        description: feature?.description,
        price: feature?.price,
        picture: undefined
    };
    const featureForm = useForm<FeatureFormValue>({
        resolver: zodResolver(editFeatureSchema),
        defaultValues: defaultValueUserForm
    });

    const onSubmit = async (data: FeatureFormValue) => {
        // console.log(data);
        try {
            const newData = { ...data, _method: 'PATCH' };
            const response = await axios.post(route('feature.update', { feature: feature.id }), newData, {
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
                        <h1 className='font-extrabold text-xl mb-3'>Feature Edit Form</h1>
                        <Form {...featureForm}>
                            <form onSubmit={featureForm.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={featureForm.control}
                                    name="name"
                                    render={({ field: { value, ...fieldProps } }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="input feature names" value={value} {...fieldProps} />
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
                                                <div className="h-auto">
                                                    <ReactQuill {...fieldProps} theme="snow" value={value} className="mb-[2.5rem]" />
                                                </div>
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
                                    render={({ field: { value, ...fieldProps } }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="100000" value={value} {...fieldProps} />
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
