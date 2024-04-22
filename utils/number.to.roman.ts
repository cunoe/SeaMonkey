import type {ShipInfo} from "~/utils/convert.shipid";

export default function numberToRoman(num: number)  {
    return romanNumerals[num] || '';
}

const romanNumerals:{[key: number]: string}  = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    11: 'XI'
};