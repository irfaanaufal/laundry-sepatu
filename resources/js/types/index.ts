import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface Menu {
    name: string;
    slug: string;
    url: string;
    icon: string;
    method: string;
    permissions: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    roles?: Role[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    [key: string]: unknown;
}

export interface TabItem {
    index: number;
    label: string;
    value: string;
    count: number;
}

export interface Feature {
    id: number;
    name: string;
    description: string;
    picture: string;
    price: string;
    [key: string]: unknown;
}
