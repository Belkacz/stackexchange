import { AxiosError } from "axios"

export type SingleTag = {
    count: number
    has_synonyms: boolean
    is_moderator_only: boolean
    is_required: boolean
    name: string
}

// export interface HttpError {
//     status: number;
//     message: string;
//   }


export type customError = {
    status: number;
    message: string;
  }

export type TagsStateType = {
    tags: SingleTag[] | never[];
    loading: boolean;
    error: AxiosError | customError | null;
  }

  export type EndpointDataTyp = {
    page: number,
    pagesize: number,
    order: sortOrderEnum,
    sortBy: sortByEnum
  }

export enum protocols {
    https = 'https',
    http = 'http'
}

export enum baseUrls {
    stackexchange = 'api.stackexchange.com'
}

export enum serviceVersion {
    v23 = '2.3'
}

export enum sortOrderEnum {
    desc = 'desc',
    asc ='asc'
}

export enum sortByEnum {
    popular = 'popular',
    name ='name'
}

export enum plusOrMinusSigns {
    minus = "MINUS",
    plus = "PLUS"
}