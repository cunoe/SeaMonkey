export interface BattleData {
    id: number;
    aid: number;
    nickname: string;
    clan: string | null;
    hidden_profile: boolean;
    user_profile: UserProfile;
    ship_profile: ShipProfile;
}

export interface UserProfile {
    blt: number;
    wr: number;
    dmg: number;
    fr: number;
    exp: number;
    pr: number;
}

export interface ShipProfile {
    blt: number;
    wr: number;
    dmg: number;
    fr: number;
    exp: number;
    pr: number;
}

export interface BattleResponse {
    code: string;
    data: {
        battle_id: string;
        battle_data: BattleData[];
    };
}
export interface Teammate {
    ship_id: number;
    id: number;
    name: string;
}

export interface Enemy {
    ship_id: number;
    id: number;
    name: string;
}

export interface BattleDataRequest {
    battle_id: string;
    battle_type: string;
    teammate_server: string;
    teammates: Teammate[];
    enemy_server: string;
    enemies: Enemy[];
}

export const defaultBattleData: BattleData = {
    id: 0,
    aid: 0,
    nickname: '',
    clan: '',
    hidden_profile: false,
    user_profile: {
        blt: 0,
        wr: 0,
        dmg: 0,
        fr: 0,
        exp: 0,
        pr: 0
    },
    ship_profile: {
        blt: 0,
        wr: 0,
        dmg: 0,
        fr: 0,
        exp: 0,
        pr: 0
    }
}

export async function fetchBattleData(data: BattleDataRequest): Promise<BattleResponse | null> {
    const url = 'http://www.wows-coral.com:8000/w/brief/';
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer user123456',
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        const jsonData: BattleResponse = await response.json();
        if (jsonData.code !== "1000") {
            throw new Error("Error fetching battle data");
        } else {
            return jsonData;
        }
    } else {
        return null;
    }
}