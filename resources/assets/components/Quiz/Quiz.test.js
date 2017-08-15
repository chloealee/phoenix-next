import React from 'react';
import { shallow } from 'enzyme';
import Quiz from './Quiz';

// Mock Redux containers so we don't need Provider context.
jest.mock('./QuizContainer', () => 'QuizContainer');

test('it should display a placeholder quiz', () => {
  const wrapper = shallow(<Quiz fields={{ title: 'test title', json: { questions: [] } }} />);
  expect(wrapper.find('div.quiz')).toHaveLength(1);
});