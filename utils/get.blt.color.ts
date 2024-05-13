export default function getBLTColor(blt: number): string {
    if (blt >= 500 && blt < 2000) {
        return "#D29D00"
    } else if (blt >= 2000 && blt < 4000) {
        return "#44B300"
    } else if (blt >= 4000 && blt < 10000) {
        return "#02C9B3"
    } else if (blt >= 10000 && blt < 20000) {
        return "#D042F3"
    } else if (blt >= 20000){
        return "#A00DC5"
    } else {
        return "#828282"
    }
}