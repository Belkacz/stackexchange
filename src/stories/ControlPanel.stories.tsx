import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tagsState } from '../services/atoms';
import { TagsStateType } from '../services/enums';
import { ControlPanelComponent } from '../Contol-Panel';
import { useEffect } from 'react';
import React from 'react';

const meta: Meta<typeof ControlPanelComponent> = {
  component: ControlPanelComponent,
  title: 'ControlPanelComponent',
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

  return <ControlPanelComponent />;
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

    return <ControlPanelComponent />;
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

    return <ControlPanelComponent />;
  },
}
