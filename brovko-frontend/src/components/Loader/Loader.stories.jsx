import React from 'react';
import Loder from './Loader'; // Update the path to your Spiner component
import './loader.module.scss'; // Update the path to your styles

export default {
  title: 'Loder', // Set the title for your component
  component: Loder,
};

export const Default = () => (
  <div className="paw">
    <Loder />
  </div>
);