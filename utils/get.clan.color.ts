import {RatingColor} from "~/types/Constant";

export default function getClanColor(clanType: number): string {
    switch (clanType){
        case 0: return RatingColor['SuperUnicum']
        case 1: return RatingColor['Good']
        case 2: return '#D4AF37'
        case 4: return '#B58735'
        default: return '#C0C0C0'
    }
}