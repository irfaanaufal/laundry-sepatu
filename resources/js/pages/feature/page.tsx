import AppLayout from '@/layouts/app-layout';
import { Feature, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table';
import { columnFeatures } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feature',
        href: '/feature/list',
    },
];

export default function FeaturePage({
    title
}: {
    title: string;
}) {
    const [features, setFeatures] = useState<Feature[]>([]);

    const fetchFeature = async () => {
        const response = await axios.get(route('feature.get'));
        if (response.status == 200) {
            setFeatures(response.data);
        }
    }

    useEffect(() => {
        fetchFeature();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-3">
                <DataTable
                    data={features}
                    columns={columnFeatures}
                    querySearch='name'
                    withBtnCreateData={true}
                    urlBtnCreateData='/feature/create'
                    labelBtnCreateData='Create New Feature'
                />
                </div>
            </div>
        </AppLayout>
    );
}
