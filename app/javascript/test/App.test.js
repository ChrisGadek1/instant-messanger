import React from 'react';
import App from "../components/App";
import {shallow} from 'enzyme'

describe("App", () => {
    it('renders App component without crash', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.text()).toContain("<BrowserRouter />")
    });
});