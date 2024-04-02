import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import App from '../App';
import { tagsState } from '../services/atoms';
import { TagsStateType, customError, SingleTag } from '../services/enums';
import { AxiosError } from 'axios';

const meta: Meta<typeof App> = {
    component: App,
    title: 'App',
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
}

export default meta;

type Story = StoryObj<typeof meta>;

type Args = {
    tags: SingleTag[];
    loading: boolean;
    error: AxiosError | customError | null
};

export const BaseInteractive: StoryObj<Args> = (args: Args) => {
    const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);

    useEffect(() => {
            setTags({
                tags: args.tags,
                loading: args.loading,
                error: args.error
            });
    }, [args.loading, args.error]);

    return <App />;
};

BaseInteractive.args = {
    tags: [
        { name: 'pierwszy', count: 444, has_synonyms: true, is_moderator_only: true, is_required: true },
        { name: 'drugi', count: 555, has_synonyms: true, is_moderator_only: true, is_required: true }
    ],
    loading: false,
    error: null // { status: 418, message: "I'm a teapot: The server refuses the attempt to brew coffee with a teapot." }
};

BaseInteractive.argTypes = {
    tags: { control: 'object' },
    loading: { control: 'boolean' },
    error: { control: 'object' }
};
export const Base: Story = {

}

export const Loading: Story = {
    render: () => {
        const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);
        setTimeout(() => {
            setTags({ ...tagsData, tags: [], loading: true });
        })
        return <App />;
    },
};

export const Error: Story = {
    render: () => {
        const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);
        setTimeout(() => {
            setTags({ ...tagsData, tags: [], loading: false, error: { status: 418, message: "I'm a teapot: The server refuses the attempt to brew coffee with a teapot." } });
        })
        return <App />;
    },
};


