import { atom } from "recoil";
import { EndpointDataTyp, TagsStateType, sortByEnum, sortOrderEnum } from "./enums";

export const tagsState = atom<TagsStateType>({
    key: 'tagsState',
    default: {
        tags: [],
        loading: true,
        error: null
    },
});

export const endpointData = atom<EndpointDataTyp>({
    key: 'endpoint',
    default: {
        page: 1,
        pagesize: 25,
        order: sortOrderEnum.desc,
        sortBy: sortByEnum.popular,
    }
})