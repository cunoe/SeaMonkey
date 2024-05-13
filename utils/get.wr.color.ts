export default function getWinRateColor(winRate: number): string {
    if (winRate > 0 && winRate < 30) {
        return "#FE0E00"
    } else if (winRate >= 30 && winRate < 50) {
        return "#D29D00"
    } else if (winRate >= 50 && winRate < 55) {
        return "#44B300"
    } else if (winRate >= 55 && winRate < 60) {
        return "#02C9B3"
    } else if (winRate >= 60 && winRate < 70) {
        return "#D042F3"
    } else if (winRate >= 70){
        return "#A00DC5"
    } else {
        return "#828282"
    }
}