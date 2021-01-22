import React from 'react';
import { describe, expect, it } from '@jest/globals';
import renderer from 'react-test-renderer';
import ComboChooser from '../ComboChooser';

describe('ComboChooser', () => {
  it('Should match snapshot', () => {
    const component = renderer.create(
      <ComboChooser
        combo={{ breed: 'breed', subBreed: 'subBreed', count: 23 }}
        lastInList={false}
        index={0}
        breeds={{
          breed: ['subBreed'],
        }}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
