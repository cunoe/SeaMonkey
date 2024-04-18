import type {GenericResponse} from "./types";
export interface tokenData {
    access_token: string;
    access_expired_at: number;
}

export async function getTokenByPhoneAndPassword(account: string, password: string): Promise<tokenData> {
    return new Promise((resolve, reject) => {
        fetch(`https://api.2some.ren/api/v1/user/login/phone/password?account=${account}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            })
            .then((data: GenericResponse) => {
                if (data.code === 200) {
                    resolve(data.data);
                } else {
                    throw new Error(`Request failed with code ${data.code}: ${data.message}`);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
