import {RatingColor} from "~/types/Constant";

export default function getBLTColor(blt: number): string {
    if (blt >= 500 && blt < 2000) {
        return RatingColor['Average']
    } else if (blt >= 2000 && blt < 4000) {
        return RatingColor['VeryGood']
    } else if (blt >= 4000 && blt < 10000) {
        return RatingColor['Great']
    } else if (blt >= 10000 && blt < 20000) {
        return RatingColor['Unicum']
    } else if (blt >= 20000){
        return RatingColor['SuperUnicum']
    } else {
        return RatingColor['None']
    }
}