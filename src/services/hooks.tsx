import { useState, useEffect, SetStateAction } from 'react';
import { fetchData } from './fetch-data';
import { TagsStateType, baseUrls, protocols, serviceVersion, EndpointDataTyp } from './enums';
import { useRecoilState } from 'recoil';
import { endpointData } from './atoms';
import { AxiosError } from 'axios';

export function useFetchData(atom: TagsStateType, setData: React.Dispatch<SetStateAction<TagsStateType>>) {
    const [endpoint] = useRecoilState<EndpointDataTyp>(endpointData);
    const newEndpoint = 'tags?page=' + endpoint.page + '&pagesize=' + endpoint.pagesize + '&order=' + endpoint.order + '&sort=' + endpoint.sortBy + '&site=stackoverflow';
    useEffect(() => {
        if (!atom.loading) {
            setData({ ...atom, loading: true, error: null });
        }
        console.log(endpoint.pagesize)
        const fetchDataAsync = async () => {
            try {
                const result = await fetchData({
                    protocol: protocols.https,
                    siteName: baseUrls.stackexchange,
                    version: serviceVersion.v23,
                    endpoint: newEndpoint
                });
                setData({ ...atom, tags: result.data.items, loading: false, error: null });
            } catch (error) {
                if (error instanceof AxiosError && error.response && error.response.status) {
                    setData({ ...atom, loading: false, error: error });
                } else {
                    setData({ ...atom, loading: false, error: { status: 418, message: "I'm a teapot: The server refuses the attempt to brew coffee with a teapot." } });
                }
                console.error('Błąd pobierania:', error);
            }
        };

        fetchDataAsync();
    }, [endpoint]);
}
