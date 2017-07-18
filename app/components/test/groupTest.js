import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Group from '../group';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const getState = {};
// const store = mockStore(getState);
const dispatch = sinon.spy();
const onClick = sinon.spy();

test('contains class "urDiv" ', t => {
    const wrapper = shallow(
    <Group
      onClick={() => dispatch(onClick())}
      name="myGroup"
    />);
    t.true(wrapper.hasClass('urDiv'));
});

test('has name "namedGroup" ', t => {
    const wrapper = shallow(
    <Group
      onClick={() => dispatch(onClick())}
      name="namedGroup"
    />);
    const li = wrapper.find('li');
    t.is(li.text(),"namedGroup");
});

test('click group', t => {
    const wrapper = shallow(
    <Group
      onClick={() => dispatch(onClick())}
      name="clickMe"
    />);
    const li = wrapper.find('li');
    li.simulate('click');
    li.simulate('click');
    t.true(onClick.calledTwice);
});

test.todo('will think about writing this group test later');

test.failing('demonstrate some bug that will pass', t => {
    t.fail(); // test will count as passed
});
