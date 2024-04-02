import axios from 'axios';
import { UrlBuild } from './interfaces'

function buildURL({ protocol, siteName: siteName, version, endpoint }: UrlBuild): string {
    return protocol + '://' + siteName + '/' + version + '/' + endpoint;
}

export async function fetchData({ protocol, siteName: baseUrl, version, endpoint }: UrlBuild) {
    const response =  axios.get(buildURL({
        protocol: protocol,
        siteName: baseUrl,
        version: version,
        endpoint: endpoint
    }));
    return response;
}
