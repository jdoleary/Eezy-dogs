import React from 'react';
import {describe, expect, it } from '@jest/globals'
import renderer from 'react-test-renderer';
import App from './App';

describe('<App>', () => {
  it('renders learn react link', () => {
    const component = renderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot()
  });
});
