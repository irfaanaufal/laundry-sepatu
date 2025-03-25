import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Role, User, type BreadcrumbItem, type TabItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table';
import { columnUsers } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user/list',
    },
];

export default function UserPage({
    title
}: {
    title: string;
}) {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const fetchUserData = async () => {
        const response = await axios.get(route('user.get'));
        if (response.status == 200) {
            setUsers(response.data);
        }
    }

    const fetchRoleData = async () => {
        const response = await axios.get(route('role.get'));
        if (response.status == 200) {
            setRoles(response.data);
        }
    }
    const tabItems: TabItem[] = roles?.map((data, idx) => ({
        index: idx + 1,
        label: data.name.substring(0,1).toUpperCase() + data.name.substring(1),
        value: data.name,
        count: data.users_count as number
    }));
    tabItems.unshift({ index: 0, label: "All Roles", value: "all", count: users.length });

    useEffect(() => {
        fetchUserData(),
        fetchRoleData()
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-3">
                    <DataTable
                        data={users}
                        columns={columnUsers}
                        tabs={tabItems}
                        querySearch='email'
                        withBtnCreateData={true}
                        urlBtnCreateData='/user/create'
                        labelBtnCreateData='Create New User'
                    />
                </div>
            </div>
        </AppLayout>
    );
}
