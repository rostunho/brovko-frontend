import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Button appearance options',
      defaultValue: 'primary',
      options: ['primary', 'outlined', 'adding', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      type: 'string',
      description: 'Button size options',
      defaultValue: 'md',
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
    type: {
      type: 'string',
      description: 'Button type',
      defaultValue: 'button',
      options: ['button', 'submit'],
      control: { type: 'radio' },
    },
    children: {
      type: 'string',
      name: 'label',
      defaultValue: 'Click me',
    },
    disabled: {
      type: 'boolean',
      description: 'Button disabling',
      defaultValue: false,
    },
  },
};

export default meta;

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  mode: 'primary',
  children: 'Click me',
  size: 'md',
};

export const Outlined = Template.bind({});
Outlined.args = {
  mode: 'outlined',
  children: 'Click',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  mode: 'primary',
  children: 'Click',
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  mode: 'primary',
  children: 'Click',
  size: 'sm',
};
