import { useState } from 'react';
import QuantityButton from './QuantityButton';

const meta = {
  component: QuantityButton,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Quantity button appearance options',
      defaultValue: 'default',
      options: ['default', 'outlined'],
    },
    size: {
      type: 'string',
      description: 'Quantity button size options',
      defaultValue: 'md',
      options: ['sm', 'md'],
    },
    setValue: {
      type: 'function',
      description: 'Function to handle value changes',
    },
    value: {
      control: {
        type: 'number',
        min: 1,
        max: 99,
      },
    },
  },
};

export default meta;

const QuantityButtonWrapper = (props) => {
  const [value, setValue] = useState(1);

  return <QuantityButton {...props} value={value} setValue={setValue} />;
};

export const Default = (args) => <QuantityButtonWrapper {...args} />;
Default.args = {
  mode: 'default',
  size: 'md',
};

export const Outlined = (args) => <QuantityButtonWrapper {...args} />;
Outlined.args = {
  ...Default.args,
  mode: 'outlined',
};

export const Small = (args) => <QuantityButtonWrapper {...args} />;
Small.args = {
  ...Default.args,
  size: 'sm',
};
