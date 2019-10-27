import { shallow } from "enzyme";
import Header from "../../components/Header";
import React from "react";

test('should render header right', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot(); 

    // expect(wrapper.find('h1').text()).toBe('Expensify')
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
}) 