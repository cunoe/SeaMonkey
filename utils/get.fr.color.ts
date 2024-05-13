export default function getFRColor(fr: number): string {
    if (fr > 0 && fr < 0.5) {
        return "#FE0E00"
    } else if (fr >= 0.5 && fr < 1) {
        return "#D29D00"
    } else if (fr >= 1 && fr < 1.5) {
        return "#44B300"
    } else if (fr >= 1.5 && fr < 2) {
        return "#02C9B3"
    } else if (fr >= 2 && fr < 2.5) {
        return "#D042F3"
    } else if (fr >= 2.5){
        return "#A00DC5"
    } else {
        return "#828282"
    }
}