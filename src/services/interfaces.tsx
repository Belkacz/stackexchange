import { protocols, serviceVersion, baseUrls } from "./enums";


export interface UrlBuild {
    protocol: protocols;
    siteName: baseUrls;
    version: serviceVersion;
    endpoint: string;
}