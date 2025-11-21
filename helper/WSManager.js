import React, { Component } from 'react';
import * as NC from "./NetworkingConstants";
//import { notify } from 'react-notify-toast';
import _ from 'lodash';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'token';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Image } from 'react-native-elements';

    const Rest = async (url, param) => {
        
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'token': await getToken(),
                'user_id':''
            },
            body: JSON.stringify(param)
        })
            .then((response) => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data.status != NC.successCode) {
                    var errorMsg = responseJson.message != '' ? responseJson.message : responseJson.global_error
                    if (errorMsg == '' || typeof errorMsg == 'undefined') {
                        for (var key in responseJson.error) {
                            errorMsg = responseJson.error[key];
                        }
                    }

                    if (responseJson.data.status == NC.sessionExpireCode) {
                        session_expire();
                        //return this.props.navigation.navigate('Login');
                       
                    } else {
                        //this.flashMessage("Error",errorMsg,"danger");
                       // notify.show(errorMsg, "error", 5000);
                    }
                }
                return responseJson;
            })
            .catch((error) => {
                if (error && typeof error.response_code != "undefined") {
                    return error;
                } else {
                    var resObj = { "response_code": 500, "data": {}, "message": "Something went wrong, please contact admin." }
                    var testData = JSON.stringify(resObj);
                    return testData;
                }
                console.error(error);
            });

    }

    const  GetRestAPI =  async (url) => {
        
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'token': await getToken(),
                'user_id':await getUserID()
            }
        })
            .then((response) => response.json())
            .then(responseJson => {
                
                // console.log('URL- ' + url + '\n\nParameters: - ' + param, '\n\nResponse: - ', responseJson);
                if (responseJson.response_code != NC.successCode) {
                    var errorMsg = responseJson.message != '' ? responseJson.message : responseJson.global_error

                    if (errorMsg == '') {
                        for (var key in responseJson.error) {
                            errorMsg = responseJson.error[key];
                        }
                    }
                    if (responseJson.response_code == NC.sessionExpireCode) {

                    } else {
                        //notify.show(errorMsg, "error", 5000);
                    }
                }
              
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const  POSTAPI =  async (url,param) => {
        
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'token': await getToken(),
                'Userid':await getUserID()
            },body: JSON.stringify(param)
        })
            .then((response) => response.json())
            .then(responseJson => {
             
                // console.log('URL- ' + url + '\n\nParameters: - ' + param, '\n\nResponse: - ', responseJson);
                if (responseJson.response_code != NC.successCode) {
                    var errorMsg = responseJson.message != '' ? responseJson.message : responseJson.global_error

                    if (errorMsg == '') {
                        for (var key in responseJson.error) {
                            errorMsg = responseJson.error[key];
                        }
                    }
                    if (responseJson.response_code == NC.sessionExpireCode) {

                    } else {
                        //notify.show(errorMsg, "error", 5000);
                    }
                }
              
                return responseJson;
            })
            .catch((error) => {
                debugger;
                console.error(error);
            });

    }
    // Check Auth

    function loggedIn() {
        return localStorage.getItem('admin_id_token') !== null;
    }


    function setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('admin_id_token', idToken);
    }

    const getToken = async () => {

        try {
            const user = await AsyncStorage.getItem(STORAGE_KEY)
         
			if (user !== null) {
				//console.log(user);
                return user;
		  	}	
		} catch (e) {
			return "";
        }

        return "";
    }


    const getUserID = async () => {

        try {
          
            const user_id = await AsyncStorage.getItem("userDta")
			if (user_id !== null) {
               const udata = JSON.parse(user_id);
				//console.log(user);
                return udata.ID;
		  	}	
		} catch (e) {
			return "";
        }
        return "";
    }

    const session_expire = async () => {

        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            
		} catch (e) {
            
            return "";
        }

        return "";
    }

    function setKeyValueInLocal(key, value) {
        // Saves user token to localStorage
        localStorage.setItem(key, value);
    }

    function getKeyValueInLocal(key) {
        // Retrieves the user token from localStorage
        return localStorage.getItem(key)
    }

    function  logout() {
        sessionStorage.clear();
        //localStorage.setItem('admin_id_token', '');
        // localStorage.clear();
        localStorage.removeItem("admin_id_token")
    }

    function flashM(message,type){
        if(type=="success"){
            return showMessage({
                message:message,
                backgroundColor: "#4CAF50",
                style: { borderRadius: 15,margin:30,justifyContent:'left',alignItems:"center" },
                // icon: props => <Image source={require("../assets/success-icon.png")} style={{ width: 35, height: 35,marginRight:8 }} />,
                duration: 4000,
                type: type //warning,danger,success
            });
        }


        if(type=="danger"){
            return showMessage({
                message:message,
                backgroundColor: "#DC4C64",
                duration: 4000,
                style: { borderRadius: 15,margin:30,justifyContent:'left',alignItems:"center" },
                // icon: props => <Image source={require("../assets/danger.png")} style={{ width: 35, height: 35,marginRight:10,tintColor:'white' }} />,
                type: type //warning,danger,success
            });
        }

        if(type=="warning"){
            return showMessage({
                title: "fdsfsdf",
                backgroundColor:'#E4A11B',
                style: { borderRadius: 15,margin:30,justifyContent:'left',alignItems:"center" },
                // icon: props => <Image source={require("../assets/warning.png")} style={{ width: 35, height: 35,marginRight:8 }} />,
                message:message,
                duration: 4000,
                type: type //warning,danger,success
            });
        }
        
    }

export {flashM,
    logout,getKeyValueInLocal,
    setKeyValueInLocal,getToken,session_expire,
    setToken,loggedIn,GetRestAPI,Rest,getUserID,POSTAPI
}
