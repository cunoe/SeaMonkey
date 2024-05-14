import {RatingColor} from "~/types/Constant";

export default function getWinRateColor(winRate: number): string {
    if (winRate > 0 && winRate < 45) {
        return RatingColor['Bad']
    } else if (winRate >= 45 && winRate < 50) {
        return RatingColor['Average']
    } else if (winRate >= 50 && winRate < 55) {
        return RatingColor['VeryGood']
    } else if (winRate >= 55 && winRate < 60) {
        return RatingColor['Great']
    } else if (winRate >= 60 && winRate < 70) {
        return RatingColor['Unicum']
    } else if (winRate >= 70){
        return RatingColor['SuperUnicum']
    } else {
        return RatingColor['None']
    }
}