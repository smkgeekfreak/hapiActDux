import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Text from '../text';

test('contains a Text with this', t => {
    const wrapper = shallow(
    <Text value="this"/>
    );
    const h1 = wrapper.find('h1');
    console.log(h1.text());
    t.is(h1.text(),"this");
});

test('contains a Text with "blank"', t => {
    const wrapper = shallow(
    <Text value=""/>
    );
    const h1 = wrapper.find('h1');
    t.is(h1.text(),"");
});
