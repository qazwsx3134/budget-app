import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../components/NotFoundPage";

test('should not found page render right', () => {
    const wrapper = shallow(<NotFound />)
    expect(wrapper).toMatchSnapshot();
})
