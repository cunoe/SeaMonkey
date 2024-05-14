import {RatingColor} from "~/types/Constant";

export default function getExpColor(exp: number): string {
    if (exp > 0 && exp < 500) {
        return RatingColor['Bad']
    } else if (exp >= 500 && exp < 800) {
        return RatingColor['Average']
    } else if (exp >= 800 && exp < 1200) {
        return RatingColor['VeryGood']
    } else if (exp >= 1200 && exp < 1600) {
        return RatingColor['Great']
    } else if (exp >= 1600 && exp < 2000) {
        return RatingColor['Unicum']
    } else if (exp >= 2000){
        return RatingColor['SuperUnicum']
    } else {
        return RatingColor['None']
    }
}