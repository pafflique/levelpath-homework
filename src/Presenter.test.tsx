import React from 'react';
import {render, screen} from '@testing-library/react';
import Presenter from './Presenter';
import {BirthsOnThisDayRepositoryFake} from './repository/births-on-this-day.repository.fake';

test('renders learn react link', () => {
  render(<Presenter repository={new BirthsOnThisDayRepositoryFake()}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
