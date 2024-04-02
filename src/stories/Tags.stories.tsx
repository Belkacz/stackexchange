import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tagsState } from '../services/atoms';
import { TagsStateType } from '../services/enums';
import { TagsComponent } from '../Tags';
import { useEffect } from 'react';

const meta: Meta<typeof TagsComponent> = {
  component: TagsComponent,
  title: 'TagsComponent',
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

export const Base: Story = (args:any) => {
  const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);

  useEffect(() => {
      setTags({
          tags: args.tags,
          loading: false,
          error: null
      });
  }, [args.tags]);

  return <TagsComponent />;
}

Base.args = {
  tags: [
      { name: 'pierwszy', count: 444, has_synonyms: true, is_moderator_only: true, is_required: true },
      { name: 'drugi', count: 555, has_synonyms: true, is_moderator_only: true, is_required: true }
  ]
};

Base.argTypes = {
  tags: { control: 'object' }
};

export const Loading: Story = {
  render: () => {
    const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);

    useEffect(() => {
      setTags({
        tags: [], loading: true, error: null,
      });
    }, []);

    return <TagsComponent />;
  },
}

export const Error: Story = {
  render: () => {
    const [tagsData, setTags] = useRecoilState<TagsStateType>(tagsState);

    useEffect(() => {
      setTags({
        tags: [], loading: false, error: { status: 418, message: "I'm a teapot: The server refuses the attempt to brew coffee with a teapot." }
      });
    }, []);

    return <TagsComponent />;
  },
}
