import { ReactNode } from "react";

export interface RowObject {
    protocol: {
        src: string;
        alt: string;
        label: string;
        size?: number;
    };
    network: {
        src: string;
        alt: string;
        label: string;
        size?: number;
    };
    amount?: {
        fusdt: number;
        usdt: number;
    };
    investedProducts?: string;
    assets?: string;
    date?: number;
    claimableRewards?: string;
    totalValue?: string;
    action?: any;
}

export interface Column<T> {
    title: string;
    dataIndex: keyof T;
    key: string;
    render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> {
    columns: Column<T>[];
    dataSource: T[];
    type?: 'normal' | 'detail' | 'card';
    onDetail?: (data: T) => void;
    header?: boolean;
}