import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
    type: {
      type: 'string',
      description: 'Input type',
      options: ['text', 'password', 'email', 'number', 'search', 'checkbox'],
      control: { type: 'radio' },
    },
    placeholder: {
      type: 'string',
      description: 'Input placeholder',
      control: { type: 'text' },
    },
    mode: {
      type: 'string',
      description: 'Input appearance options',
      defaultValue: 'primary',
      options: ['anabled', 'disabled'],
      control: {
        type: 'radio',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    length: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

const Template = args => <Input {...args} />;

export const InputSmall = Template.bind({});
InputSmall.args = {
  id: 'input1',
  name: 'input1',
  label: 'Input small',
  size: 'sm',
  length: 'sm',
};

export const InputMedium = Template.bind({});
InputMedium.args = {
  id: 'input2',
  name: 'input2',
  label: 'Input Medium',
  size: 'md',
  length: 'md',
};

export const InputLarge = Template.bind({});
InputLarge.args = {
  id: 'input3',
  name: 'input3',
  label: 'Input large',
  size: 'lg',
  length: 'lg',
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  id: 'input4',
  name: 'input4',
  label: 'Disabled input',
  type: 'text',
  size: 'sm',
  length: 'lg',
  mode: 'disabled',
};

export const СheckBox = Template.bind({});
СheckBox.args = {
  id: 'checkBox1',
  name: 'checkBox1',
  label: 'checkBox',
  type: 'checkbox',
  size: 'sm',
};

export const DisabledСheckBox = Template.bind({});
DisabledСheckBox.args = {
  id: 'checkBox2',
  name: 'checkBox2',
  label: 'Disabled checkBox',
  type: 'checkbox',
  size: 'sm',
  mode: 'disabled',
};
