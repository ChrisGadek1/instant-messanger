import axios from "axios";

export const validateName = (value, name) => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if(value.length < 2){
        return `${name} must be longer than 1 character`
    }
    else if(value.length > 100){
        return `${name} must be shorter than 100 characters`
    }
    else if(name !== "password" && name !== "email" && !value.match(letterNumber)){
        return `${name} must contain only digits and numbers`
    }
    return ""
}

export const validateEmail = (value, name) => {
    let result = validateName(value, "email");
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!value.toLowerCase().match(emailRegex)){
        result = `This is not a correct email`
    }
    return result;
}

export const validatePassword = (value) => {
    let result = validateName(value, "password");
    if(value.length < 8){
        result = "password must be longer than 7 characters";
    }
    return result;
}

export const validateRepeatPassword = (password, repeatPassword) => {
    if(password !== repeatPassword){
        return "repeated password isn't equal to the password"
    }
    return ""
}

const getIsTakenError = (value, name, url, testData) => {
    return new Promise((resolve, reject) => {
        axios.post(url,{
                value: value,
                authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : ""
        }).then(({data}) => {
            if(data[testData]){
                resolve(`This ${name} is already taken`)
            }
            else{
                resolve("");
            }
        }).catch(e => {
            console.error(e)
            reject("there was an error with connection")
        })
    })
}

export const validateFromApi = async (value, name, url, testData, isEmail) => {
    return new Promise((resolve) => {
        let result = "";
        result = validateName(value, name)
        if(isEmail && result === ""){
            result = validateEmail(value, name)
        }
        if(result === ""){
            result = getIsTakenError(value, name, url, testData);
        }
        resolve(result)
    })
}