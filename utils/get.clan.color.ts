import {RatingColor} from "~/types/Constant";

export default function getClanColor(clanType: number): string {
    switch (clanType){
        case 0: return RatingColor['SuperUnicum']
        case 1: return RatingColor['Good']
        case 2: return RatingColor['Average']
        case 4: return RatingColor['BelowAverage']
        default: return '#C0C0C0'
    }
}