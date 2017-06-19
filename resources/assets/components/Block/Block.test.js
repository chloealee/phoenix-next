import React from 'react';
import { shallow } from 'enzyme';
import Block from './Block';

// Mock Redux containers so we don't need Provider context.
jest.mock('./BlockContainer', () => 'BlockContainer');
jest.mock('../../containers/CallToActionContainer', () => 'CallToActionContainer');

test('it can display a campaign update', () => {
  const wrapper = shallow(<Block json={{ id: '12345', fields: { type: 'campaign_update' } }} />);
  expect(wrapper.find('CampaignUpdateBlock')).toHaveLength(1);
});

test('it can display a CTA block', () => {
  const wrapper = shallow(<Block json={{ id: '12345', fields: { type: 'join_cta' } }} />);
  expect(wrapper.find('CallToActionContainer')).toHaveLength(1);
});

test('it can display a static block', () => {
  const wrapper = shallow(<Block json={{ id: '12345', fields: { type: 'static' } }} />);
  expect(wrapper.find('StaticBlock')).toHaveLength(1);
});

test('it can display a reportback block', () => {
  const json = { id: '12345', fields: { type: 'reportbacks' }, reportbacks: [] };
  const wrapper = shallow(<Block json={json} />);
  expect(wrapper.find('ReportbackBlock')).toHaveLength(1);
});

test('it should display a placeholder for an unknown block type', () => {
  const wrapper = shallow(<Block json={{ id: '12345', fields: { type: 'tongue_cat' } }} />);
  expect(wrapper.find('PlaceholderBlock')).toHaveLength(1);
});

test('it should display a placeholder for an empty block', () => {
  const wrapper = shallow(<Block />);
  expect(wrapper.find('PlaceholderBlock')).toHaveLength(1);
});