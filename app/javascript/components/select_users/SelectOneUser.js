import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async/dist/react-select.esm";

const SelectOneUser = ({onChange}) => {
    const getNewUsers = async (searchPhrase) => {
        if(searchPhrase.length === 0){
            return new Promise(resolve => {
                resolve([])
            })
        }
        return new Promise((resolve, reject) => {
            axios.get(`/users/find_people/${encodeURIComponent(searchPhrase)}`).then(({data}) => {
                resolve(data.foundUsers)
            }).catch((e) => {
                reject(e);
            })
        })
    }

    const loadOptions = async (input, cb) => {
        if(input.length === 0){
            cb([]);
        }
        const foundUsers = await getNewUsers(input);
        cb(foundUsers.map(foundUser => ({
            value: foundUser,
            label: <div key={foundUser.username+"searchlist"} className="d-flex flex-row">
                <img src={foundUser.avatar} width="30px" height="30px" className="me-3"/>
                {foundUser.name} {foundUser.surname} (@{foundUser.username})
            </div>})));
    }
    return(
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            placeholder="Enter name, surname or user name"
            onChange={onChange}
        >
        </AsyncSelect>
    )
}

export default SelectOneUser;