import {RatingColor} from "~/types/Constant";

export default function getFRColor(fr: number): string {
    if (fr > 0 && fr < 0.5) {
        return RatingColor['Bad']
    } else if (fr >= 0.5 && fr < 1) {
        return RatingColor['Average']
    } else if (fr >= 1 && fr < 1.5) {
        return RatingColor['VeryGood']
    } else if (fr >= 1.5 && fr < 2) {
        return RatingColor['Great']
    } else if (fr >= 2 && fr < 2.5) {
        return RatingColor['Unicum']
    } else if (fr >= 2.5){
        return RatingColor['SuperUnicum']
    } else {
        return RatingColor['None']
    }
}