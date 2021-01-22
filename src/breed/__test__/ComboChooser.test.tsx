import React from 'react';
import { describe, expect, it } from '@jest/globals';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import ComboChooser from '../ComboChooser';

const testBreedCombo = { breed: 'breed', subBreed: 'subBreed', count: 23 };
const testBreedMap = {
  breed: ['subBreed'],
};

describe('ComboChooser', () => {
  it('Should match snapshot', () => {
    const component = renderer.create(
      <ComboChooser
        combo={testBreedCombo}
        lastInList={false}
        index={0}
        breeds={testBreedMap}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('Plus Button', () => {
    it('Should display the plus button if it is the lastInList', () => {
      const chooser = Enzyme.shallow(
        <ComboChooser
          combo={testBreedCombo}
          lastInList={true}
          index={0}
          breeds={testBreedMap}
        />,
      );
      expect(
        chooser.find('[data-test-id="plus-icon"]').get(0).props,
      ).toHaveProperty('visibility', 'visible');
    });
    it('Should NOT display the plus button if it is NOT the lastInList', () => {
      const chooser = Enzyme.shallow(
        <ComboChooser
          combo={testBreedCombo}
          lastInList={false}
          index={0}
          breeds={testBreedMap}
        />,
      );
      expect(
        chooser.find('[data-test-id="plus-icon"]').get(0).props,
      ).toHaveProperty('visibility', 'hidden');
    });
  });
});
