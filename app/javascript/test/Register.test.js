import React from 'react';
import Register from '../components/register/Register'
import {mount, shallow} from 'enzyme'
import {waitFor} from "@testing-library/react";
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const getStringWithLength = (number) => {
    let result = "";
    [...Array(number).keys()].forEach(_ => {
        result += "a";
    });
    return result;
}

jest.mock("axios");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Register Validations: ", () => {
    it("validates too short name in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='name']");
        nameInput.simulate('change', {target: {value: "a"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='name'] + p").text()).toBe("name must be longer than 1 character")
    })

    it("validates too long name in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='name']");
        nameInput.simulate('change', {target: {value: getStringWithLength(101) }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='name'] + p").text()).toBe("name must be shorter than 100 characters")
    })

    it("doesn't show errors if name is correct", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='name']");
        nameInput.simulate('change', {target: {value: "Kate" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='name'] + p").text()).toBe("")
    })

    it("validates too short surname in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='surname']");
        nameInput.simulate('change', {target: {value: "a"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='surname'] + p").text()).toBe("surname must be longer than 1 character")
    })

    it("validates too long surname in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='surname']");
        nameInput.simulate('change', {target: {value: getStringWithLength(101) }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='surname'] + p").text()).toBe("surname must be shorter than 100 characters")
    })

    it("doesn't show errors if surname is correct", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='surname']");
        nameInput.simulate('change', {target: {value: "Winston" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='surname'] + p").text()).toBe("")
    })

    it("validates too short email in the register form",  async() => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='email']");
        nameInput.simulate('change', {target: {value: "a"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='email'] + p").text()).toBe("email must be longer than 1 character"))
    })

    it("validates too long email in the register form", async() => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='email']");
        nameInput.simulate('change', {target: {value: getStringWithLength(101) }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='email'] + p").text()).toBe("email must be shorter than 100 characters"))
    })

    it("validates wrong email format in the register form", async() => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='email']");
        nameInput.simulate('change', {target: {value: "asdasd" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='email'] + p").text()).toBe("This is not a correct email"))
    })

    it("validates already taken email in the register form", async() => {
        axios.mockResolvedValueOnce({data: {isTaken: true}});

        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='email']");
        nameInput.simulate('change', {target: {value: "asdasd@wp.pl" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='email'] + p").text()).toBe("This email is already taken"))
    })

    it("doesn't show errors if email is correct", () => {
        axios.mockResolvedValueOnce({data: {isTaken: false}});
        
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='email']");
        nameInput.simulate('change', {target: {value: "test@wp.pl" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='email'] + p").text()).toBe("")
    })

    it("validates too short username in the register form",  async() => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='username']");
        nameInput.simulate('change', {target: {value: "a"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='username'] + p").text()).toBe("username must be longer than 1 character") );
    })

    it("validates too long username in the register form", async() => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='username']");
        nameInput.simulate('change', {target: {value: getStringWithLength(101) }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='username'] + p").text()).toBe("username must be shorter than 100 characters"))
    })

    it("validates already taken username in the register form", async() => {
        axios.mockResolvedValueOnce({data: {isTaken: true}});

        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='username']");
        nameInput.simulate('change', {target: {value: "fajnynick" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='username'] + p").text()).toBe("This username is already taken"))
    })

    it("doesn't show errors if username is correct", () => {
        axios.mockResolvedValueOnce({data: {isTaken: false}});

        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='username']");
        nameInput.simulate('change', {target: {value: "someUsername112" }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='username'] + p").text()).toBe("")
    })

    it("validates too short password in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='password']");
        nameInput.simulate('change', {target: {value: "asdadda"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='password'] + p").text()).toBe("password must be longer than 7 characters")
    })

    it("validates too long password in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='password']");
        nameInput.simulate('change', {target: {value: getStringWithLength(101) }})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='password'] + p").text()).toBe("password must be shorter than 100 characters")
    })

    it("validates password that isn't identical to the repeated password", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='password']");
        const repeatedPassword = register.find("#register-repeated-password");

        nameInput.simulate('change', {target: {value: "somepassword" }})
        repeatedPassword.simulate('change', {target: {value: "otherpassword"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("#register-repeated-password + p").text()).toBe("repeated password isn't equal to the password")
    })

    it("doesn't show errors if password is correct", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='password']");
        const repeatedPassword = register.find("#register-repeated-password");

        nameInput.simulate('change', {target: {value: "somepassword" }})
        repeatedPassword.simulate('change', {target: {value: "somepassword"}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='password'] + p").text()).toBe("")
        expect(register.find("#register-repeated-password + p").text()).toBe("")
    })

    it("validates name that contains other chars than digits and numbers in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='name']");
        nameInput.simulate('change', {target: {value: "a   "}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='name'] + p").text()).toBe( "name must contain only digits and numbers")
    })

    it("validates surname that contains other chars than digits and numbers in the register form", () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='surname']");
        nameInput.simulate('change', {target: {value: "a   ..."}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        expect(register.find("input[name='surname'] + p").text()).toBe( "surname must contain only digits and numbers")
    })

    it("validates username that contains other chars than digits and numbers in the register form", async () => {
        const register = mount(<BrowserRouter><Register /></BrowserRouter> );
        const nameInput = register.find("input[name='username']");
        nameInput.simulate('change', {target: {value: "a   ..."}})

        register.find("form").simulate("submit", { preventDefault: () => {} });

        await waitFor(() => expect(register.find("input[name='username'] + p").text()).toBe( "username must contain only digits and numbers"));
    })
})