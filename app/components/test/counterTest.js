import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Counter from '../counter';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const getState = {};
const store = mockStore(getState);
const dispatch = sinon.spy();
const countUp = sinon.spy();
const countDown = sinon.spy();

test('has a myDiv class name', t => {
    const wrapper = shallow(
    <Counter value={store.getState()}
      onInc={() => store.dispatch(countUp())}
      onDe={() => store.dispatch(countDown())}
    />);

    t.true(wrapper.hasClass('myDiv'));
});

test('click `buttons`', t => {
    const wrapper = shallow(
    <Counter value={store.getState()}
      onInc={() => dispatch(countUp())}
      onDe={() => dispatch(countDown())}
    />);
    wrapper.find('#increment').simulate('click');
    wrapper.find('#decrement').simulate('click');
    t.true(countUp.calledOnce);
    t.true(countDown.calledOnce);
});

test('renders `.myDiv`', t => {
    const wrapper = shallow(
    <Counter value={store.getState()}
      onInc={() => store.dispatch(countUp())}
      onDe={() => store.dispatch(countDown())}
    />);
    t.is(wrapper.find('.myDiv').length, 1);
});
