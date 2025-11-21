import WSManager from './WSManager';
import moment from 'moment';
export default class HelperFunction {
    static getNumberWithCommas(x) {
        var res = x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
        return res
    }
    static getFormatedDateTime = (date, format) => {
        if (format) {
            return moment.utc(date).local().format(format);
        }
        return moment(date).utc().local().format();
    }

    static showCountDown(dateTime) {
        let scheduleDate = WSManager.getUtcToLocal(dateTime);
        let currentDate = HelperFunction.getFormatedDateTime(Date.now());
        var now = moment(currentDate); //todays date
        var end = moment(scheduleDate); // another date
        var duration = moment.duration(end.diff(now));
        var hours = duration.asHours();
        var minutes = duration.asMinutes();
        return ((minutes >= 0) && (hours <= 24));
    }


    static getTimeDiff = (dateTime) => {
        let scheduleDate = WSManager.getUtcToLocal(dateTime);
        let currentDate = this.getFormatedDateTime(Date.now());
        var now = moment(currentDate); //todays date
        var end = moment(scheduleDate); // another date
        var duration = moment.duration(end.diff(now));
        var hours = duration.asHours();
        var minutes = duration.asMinutes();
        // return true;   
        return (minutes <= 0);
    }

    static getPercent = (value, total_value) => {
        let Percentage = "0"
        if (total_value > "0")
            Percentage = ((value / total_value) * 100).toFixed(0)
        return Percentage
    }

    static isFloat(value) {
        return !isNaN(value) && value.toString().indexOf('.') != -1
    }
    
    static scrollView(ID) {
        var elmnt = document.getElementById(ID);
        elmnt.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}