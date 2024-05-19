import type {NitroFetchOptions} from "nitropack";

export interface DefaultResponse<T> {
    code: number;
    message: string;
    data?: T;
    time: number;
    support: string[];
}

export interface GetShipInfoRequest {
    shipId: string;
}

export interface ShipInfoResponseData {
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
}

function getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Yuyuko-Client-Type', 'SeaMonkey;v0.0.1');
    return headers;
}


export async function fetchShipInfo(shipId: string): Promise<ShipInfoResponseData> {
    const reqUrl = `https://v3-api.wows.shinoaki.com/public/wows/encyclopedia/ship/info?shipId=${shipId}`;
    const reqOptions: NitroFetchOptions<any> = {
        method: 'GET',
        headers: getHeaders(),
        timeout: 10000
    };
    return new Promise((resolve, reject) => {
      const resp = $fetch(reqUrl, reqOptions);
        resp.then(({ data, message }: any) => {
            const value = data as ShipInfoResponseData;
            if (message !== 'success') {
                reject(message);
            } else {
                resolve(value);
            }
        }).catch((err) => {
            reject(err);
        })
    })
}
