export interface ShipInfoResponse {
    code: number;
    message: string;
    data: {
        server: string;
        shipId: number;
        nameCn: string;
        nameCn360: string;
        nameEnglish: string;
        nameRu: string | null;
        nameNumbers: string;
        level: number;
        shipType: string;
        country: string;
        imgSmall: string;
        imgLarge: string;
        imgMedium: string;
        groupType: string;
    };
    time: number;
    support: string[];
}

export async function fetchShipInfo(shipId: string): Promise<ShipInfoResponse | null> {
    const response = await fetch(`https://v3-api.wows.shinoaki.com/public/wows/encyclopedia/ship/info?shipId=${shipId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Yuyuko-Client-Type': 'SeaMonkey;v0.0.1'
        }
    });
    if (!response.ok) {
        return null
    }
    return await response.json() as ShipInfoResponse;
}

export function fetchShipInfoStack(shipId: string): ShipInfoResponse | null {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://v3-api.wows.shinoaki.com/public/wows/encyclopedia/ship/info?shipId=${shipId}`, false);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Yuyuko-Client-Type', 'SeaMonkey;v0.0.1');
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText) as ShipInfoResponse;
    } else {
        return null;
    }
}
