import React from "react";
import Enzyme, {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import UserDetails from "../components/user_details/UserDetails";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import configureStore from "redux-mock-store"
import {waitFor} from "@testing-library/react";
import realStore from "../redux/store/store";
import {addUser} from "../redux/actions/userActions";
const middlewares = []
const mockStore = configureStore(middlewares)

const initialState = {user: {
        username: "marianos",
        name: "Marian",
        surname: "Nosowski",
        email: "mariannos@gmail.com",
        avatar: ""}
}

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

afterEach(() => {
    jest.clearAllMocks();
});

describe('User Details test', () => {
    it('shows the user details if logged', () => {
        const store = mockStore(initialState)
        const userDetails = mount(<Provider store={store}><BrowserRouter><UserDetails/></BrowserRouter></Provider>);
        expect(userDetails.find("input[value='Marian']").exists()).toBe(true)
        expect(userDetails.find("input[value='Nosowski']").exists()).toBe(true)
        expect(userDetails.find("input[value='marianos']").exists()).toBe(true)
        expect(userDetails.find("input[value='mariannos@gmail.com']").exists()).toBe(true)
    })

    it('changes the user data if successfully submitted changes', async () => {
        axios.put.mockResolvedValue({data: { status: 'OK', message: 'OK', isTaken: false }, status: 200});
        axios.post.mockResolvedValue({data: { status: 'OK', message: 'OK', isTaken: false }, status: 200});

        realStore.dispatch(addUser(initialState.user));
        const userDetails = mount(<Provider store={realStore}><BrowserRouter><UserDetails/></BrowserRouter></Provider>);
        axios.put.mockResolvedValueOnce({data: { status: 'OK', message: 'OK' }, status: 200});
        userDetails.find("input[value='Marian']").simulate('change', { target: { value: 'Jakub' } })
        userDetails.find("#name-change-form").simulate("submit", {
            preventDefault: () => {}
        });
        await waitFor(() => expect(realStore.getState().user.name).toBe("Jakub"))

        userDetails.find("input[value='Nosowski']").simulate('change', { target: { value: 'Kowalski' } })
        userDetails.find("#surname-change-form").simulate("submit", {
            preventDefault: () => {}
        });
        await waitFor(() => expect(realStore.getState().user.surname).toBe("Kowalski"))

        userDetails.find("input[value='marianos']").simulate('change', { target: { value: 'jakubos' } })
        userDetails.find("#username-change-form").simulate("submit", {
            preventDefault: () => {}
        });
       await waitFor(() => expect(realStore.getState().user.username).toBe("jakubos"))

        userDetails.find("input[value='mariannos@gmail.com']").simulate('change', { target: { value: 'jakubos@gmail.com' } })
        userDetails.find("#email-change-form").simulate("submit", {
            preventDefault: () => {}
        });
        await waitFor(() => expect(realStore.getState().user.email).toBe("jakubos@gmail.com"))

    })
})