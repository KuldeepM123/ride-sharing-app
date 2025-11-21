import {GetRestAPI,POSTAPI} from './WSManager';
import * as NC from './NetworkingConstants';
import { API_URL } from '@env';


export function  getTagsList(data) {
    let params = data ? data : {}
    const Rdata = GetRestAPI(API_URL + NC.TAGS_NAME, params);
    return Rdata;
}
export function  getIndustryTagPostList(data,id) {
    let params = data ? data : {}
    const ViewData = GetRestAPI(API_URL + NC.VIEW_POST_API+id , params);
    return ViewData;
}

export function  getNetWorkAndIndustryList() {
    let params = {}
    const GET_NETWORK_INDUSTRY = GetRestAPI(API_URL + NC.GET_NETWORK_INDUSTRY, params);
    return GET_NETWORK_INDUSTRY;
}

export function  getUserNetWorkAndIndustryIDs() {
    let params = {}
    const GET_NETWORK_INDUSTRY = POSTAPI(API_URL + NC.GET_USER_NETWORK_INDUSTRY, params);
    return GET_NETWORK_INDUSTRY;
}


export function  updateNetWorkAndIndustryIDs(data) {
    let params = data ? data : {}
    const UPDATE_NETWORK_INDUSTRY = POSTAPI(API_URL + NC.NETWORK_INSUTRY_UPDATE, params);
    return UPDATE_NETWORK_INDUSTRY;
}

export function  contactUs(data) {
    let params = data ? data : {}
    const CONTACTUS_URL = POSTAPI(API_URL + NC.CONTACTUS_URL, params);
    return CONTACTUS_URL;
}


export function  getWebsiteByNetWorkID(data) {

    let params = data ? data : {}
    const GET_NETWORK_WEBSITE_BY_ID = POSTAPI(API_URL + NC.GET_NETWORK_WEBSITE_BY_ID, params);
    return GET_NETWORK_WEBSITE_BY_ID;
}



