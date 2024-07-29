'use client'

import { useEffect, useState } from "react";

export const useRequest = <T>(requestFunc: () => Promise<T>, initialValue: T): [T, { loading: boolean, error: string }] => {
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestFunc();
                setData(response);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [requestFunc]);

    return [data, { loading, error }];
}
