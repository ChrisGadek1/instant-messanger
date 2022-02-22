import React from 'react';
import {mount, shallow} from 'enzyme'
import {waitFor} from "@testing-library/react";
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from "../components/login/login";
import {Provider} from "react-redux";
import store from "../redux/store/store";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Login Validations: ", () => {
    it("validates wrong login data",async () => {
        axios.mockResolvedValueOnce({data: {isTaken: true}, status: 422});

        const login = mount(<Provider store={store}><BrowserRouter><Login/></BrowserRouter></Provider>);
        const loginInput = login.find("input[name='login']");
        loginInput.simulate('change', {target: {value: "someemail@gmail.com"}})
        const passwordInput = login.find("input[name='login_password']");
        passwordInput.simulate('change', {target: {value: "asdasdasd"}})

        login.find("form").simulate("submit", {
            preventDefault: () => {}
        });

        await waitFor(() => expect(login.find("#login-error-label").text()).toBe("Sorry, that didn't work. Try again"));
    })
});