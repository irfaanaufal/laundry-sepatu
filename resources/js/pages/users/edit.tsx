import AppLayout from '@/layouts/app-layout';
import { Role, User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { z } from 'zod';
import { editUserSchema } from './validation';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditUserPage({
        title,
        user
    }: {
        title: string;
        user: User
    }) {
    console.log(user);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'User',
            href: '/user/list',
        },
        {
            title: 'Edit User',
            href: `/user/edit/${user.id}`,
        },
    ];
    const [roles, setRoles] = useState<Role[]>([]);
    const fetchRoles = async () => {
        const response = await axios.get(route('role.get'));
        if (response.status == 200) {
            setRoles(response.data);
        }
    }
    type UserFormValue = z.infer<typeof editUserSchema>;
    const defaultValueUserForm: Partial<UserFormValue> = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles: user?.roles?.[0].name as string ?? undefined,
    };
    const userForm = useForm<UserFormValue>({
        resolver: zodResolver(editUserSchema),
        defaultValues: defaultValueUserForm
    });
    useEffect(() => {
        fetchRoles()
    }, []);

    const onSubmit = async (data: UserFormValue) => {
        try {
            const newData = { ...data, _method: `patch` };
            const response = await axios.post(route('user.update', {
                user: user.id,
            }), newData);
            if (response.status == 200) {
                toast(response.data.message);
            }
            if (response.status != 200) {
                throw(`Error`);
            }
            setTimeout(() => {
                window.location.href = '/user/list';
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
                    <h1 className='font-extrabold text-xl mb-3'>User Edit Form</h1>
                        <Form {...userForm}>
                            <form onSubmit={userForm.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={userForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="input user fullname" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is user public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={userForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="081XXXXXXX" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is user public display phone number.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={userForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@example.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is user public display email.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={userForm.control}
                                    name="roles"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Roles</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role to display" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roles ?
                                                    roles.map((role, idx) => {
                                                        return <SelectItem key={`${role.name}-${idx}`} value={role.name}>{role.name.substring(0,1).toUpperCase() + role.name.substring(1)}</SelectItem>
                                                    })
                                                :
                                                <SelectItem value="">There's no roles</SelectItem>
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            This is user role to grand some access menu and action
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <div className="flex gap-2">
                                    <Button type="submit">Submit</Button>
                                    <Link href="/user/list">
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
