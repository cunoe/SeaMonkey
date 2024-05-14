export interface RatingData {
    code: number;
    value: number;
    nextValue: number;
    name: string;
    englishName: string;
    color: string;
}

export default function getPersonalRateData(rate: number): RatingData {
    if (rate > 0 && rate < 750) {
        return ratingData[1];
    } else if (rate >= 750 && rate < 1100) {
        return ratingData[2];
    } else if (rate >= 1100 && rate < 1350) {
        return ratingData[3];
    } else if (rate >= 1350 && rate < 1550) {
        return ratingData[4];
    } else if (rate >= 1550 && rate < 1750) {
        return ratingData[5];
    } else if (rate >= 1750 && rate < 2100) {
        return ratingData[6];
    } else if (rate >= 2100 && rate < 2450 ) {
        return ratingData[7];
    } else if (rate >= 2450) {
        return ratingData[8];
    } else {
        return ratingData[0];
    }
}


const ratingData : RatingData[] =  [
    {
        "code": 0,
        "value": 0,
        "nextValue": 0,
        "name": "暂无数据",
        "englishName": "No Rating",
        "color": "#828282"
    },
    {
        "code": 1,
        "value": 750,
        "nextValue": 0,
        "name": "还需努力",
        "englishName": "Bad",
        "color": "#b30000"
    },
    {
        "code": 2,
        "value": 1100,
        "nextValue": 0,
        "name": "低于平均",
        "englishName": "Below Average",
        "color": "#FE7903"
    },
    {
        "code": 3,
        "value": 1350,
        "nextValue": 0,
        "name": "平均水平",
        "englishName": "Average",
        "color": "#D29D00"
    },
    {
        "code": 4,
        "value": 1550,
        "nextValue": 0,
        "name": "好",
        "englishName": "Good",
        "color": "#3a9a00"
    },
    {
        "code": 5,
        "value": 1750,
        "nextValue": 0,
        "name": "很好",
        "englishName": "Very Good",
        "color": "#318000"
    },
    {
        "code": 6,
        "value": 2100,
        "nextValue": 0,
        "name": "非常好",
        "englishName": "Great",
        "color": "#02b09d"
    },
    {
        "code": 7,
        "value": 2450,
        "nextValue": 0,
        "name": "大佬水平",
        "englishName": "Unicum",
        "color": "#D042F3"
    },
    {
        "code": 8,
        "value": 2450,
        "nextValue": 0,
        "name": "神佬水平",
        "englishName": "Super Unicum",
        "color": "#A00DC5"
    }
]