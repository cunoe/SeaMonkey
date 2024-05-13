export default function getExpColor(exp: number): string {
    if (exp > 0 && exp < 500) {
        return "#FE0E00"
    } else if (exp >= 500 && exp < 800) {
        return "#D29D00"
    } else if (exp >= 800 && exp < 1200) {
        return "#44B300"
    } else if (exp >= 1200 && exp < 1600) {
        return "#02C9B3"
    } else if (exp >= 1600 && exp < 2000) {
        return "#D042F3"
    } else if (exp >= 2000){
        return "#A00DC5"
    } else {
        return "#828282"
    }
}