import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Todo from '../todo';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const getState = {};
const store = mockStore(getState);
const onClick = sinon.spy();

test('contains class "theirDiv" ', t => {
    const wrapper = shallow(
    <Todo
      onClick={() => store.dispatch(onClick(1))}
      completed="true"
      text="Try"
    />);
    t.true(wrapper.hasClass('theirDiv'));
});

test('contains text "Works" ', t => {
    const wrapper = shallow(
    <Todo
      onClick={() => store.dispatch(onClick(1))}
      completed="true"
      text="Works"
    />);
    const li = wrapper.find('li');
    t.is(li.text(),"Works");
});

test('does not contain "Works" ', t => {
    const wrapper = shallow(
    <Todo
      onClick={() => store.dispatch(onClick(1))}
      completed="true"
      text="NotWorking"
    />);
    const li = wrapper.find('li');
    t.not(li.text(),"Works");
});

test('click todo', t => {
    const wrapper = shallow(
    <Todo
      onClick={() => store.dispatch(onClick(1))}
      completed="true"
      text="Works"
    />);
    const li = wrapper.find('li');
    li.simulate('click');
    li.simulate('click');
    t.true(onClick.calledTwice);
});
