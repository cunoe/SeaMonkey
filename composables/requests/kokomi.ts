export interface BattleData {
    id: number;
    aid: number;
    nickname: string;
    clan: string | null;
    clan_type: number;
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

export interface BattleDataResponse {
    code: string;
    data: {
        battle_id: string;
        battle_data: BattleData[];
        error: string;
        error_info: string;
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
    clan_type: -1,
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

function getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer user123456');
    headers.append('Content-Type', 'application/json');
    return headers;
}

export async function fetchBattleData(data: BattleDataRequest): Promise<BattleDataResponse> {
    const url = 'http://www.wows-coral.com:8000/w/brief/';
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        const jsonData: BattleDataResponse = await response.json();
        if (jsonData.code === "1001" ) {
            throw new Error(`服务器超时，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`);
        } else if (jsonData.code === "1002") {
            throw new Error(`服务内部错误，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`)
        } else if (jsonData.code === "1003") {
            throw new Error(`用户所在服务器不匹配，请检查服务器设置！`)
        } else {
            return jsonData;
        }
    } else {
        throw new Error(`请求失败，状态码：${response.status}`);
    }
}

export interface PlayerDataRequest {
    aid: string;
    server: string;
}

export interface PlayerDataResponse {
    code: string;
    data: PlayerData
}

export interface PlayerData {
    pr: PlayerDataDetail
    bt: {
        pvp_solo: PlayerDataDetail; // pvp_solo 战斗类型
        pvp_div2: PlayerDataDetail; // pvp_div2 战斗类型
        pvp_div3: PlayerDataDetail; // pvp_div3 战斗类型
        rank_solo: PlayerDataDetail; // rank_solo 战斗类型
    };
    st: {
        AirCarrier: ShipTypeDetail; // 航空母舰
        Battleship: ShipTypeDetail; // 战列舰
        Cruiser: ShipTypeDetail; // 巡洋舰
        Destroyer: ShipTypeDetail; // 驱逐舰
        Submarine: ShipTypeDetail; // 潜艇
    };
    error: string;
    error_info: string;
}

export interface PlayerDataDetail {
    blt: number; // 战斗场次
    wr: number; // 胜率
    dmg: number; // 场均伤害
    fr: number; // 击杀率
    exp: number; // 平均经验
    pr: number; // PR值
}

export interface ShipTypeDetail {
    blt: number; // 战斗场次
    wr: number; // 胜率
    dmg: number; // 场均伤害
    fr: number; // 击杀率
    exp: number; // 平均经验
    pr: number; // PR值
}

export async function fetchPlayerData(data: PlayerDataRequest): Promise<PlayerDataResponse> {
    const url = `http://www.wows-coral.com:8000/w/user-detail?aid=${data.aid}&server=${data.server}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (response.status === 200) {
        const jsonData: PlayerDataResponse = await response.json();
        if (jsonData.code === "1001" ) {
            throw new Error(`服务器超时，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`);
        } else if (jsonData.code === "1002") {
            throw new Error(`服务内部错误，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`)
        } else if (jsonData.code === "1004") {
            throw new Error(`用户隐藏战绩或者无战斗数据`)
        } else {
            return jsonData;
        }
    } else {
        throw new Error(`请求失败，状态码：${response.status}`);
    }
}

export interface ShipDataRequest {
    aid: string;
    server: string;
    ship_id: number;
}

export interface ShipDataResponse {
    code: string;
    data: ShipData
}

export interface ShipData {
    pr: PlayerDataDetail
    bt: {
        pvp_solo: PlayerDataDetail; // pvp_solo 战斗类型
        pvp_div2: PlayerDataDetail; // pvp_div2 战斗类型
        pvp_div3: PlayerDataDetail; // pvp_div3 战斗类型
        rank_solo: PlayerDataDetail; // rank_solo 战斗类型
    };
    info: ShipDetailInfo; // 船只详细数据
    error: string;
    error_info: string;
}

export interface ShipDetailInfo {
    survival_rate: string; // 生存率
    avg_planes_killed: string; // 平均击落飞机数
    avg_potential_dmage: string; // 平均潜在伤害
    avg_spotting_damage: string; // 平均侦查伤害
    captuer_contribution: string; // 夺取贡献
    defense_contribution: string; // 防御贡献
    main_battery: string; // 主炮
    second_battrey: string; // 副炮
    torpedo: string; // 鱼雷
    rocket: string; // 火箭
    bomb: string; // 炸弹
    skip_bomb: string; // 跳弹
    max_frags: string; // 最大击沉数
    max_damage: string; // 最大伤害
    max_potential_damage: string; // 最大潜在伤害
    max_exp: string; // 最大经验
    max_spotting_damage: string; // 最大侦查伤害
    max_planes_killed: string; // 最大击落飞机数
}

export async function fetchShipData(data: ShipDataRequest): Promise<ShipDataResponse> {
    const url = `http://www.wows-coral.com:8000/w/ship-detail?aid=${data.aid}&server=${data.server}&ship_id=${data.ship_id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (response.status === 200) {
        const jsonData: ShipDataResponse = await response.json();
        if (jsonData.code === "1001" ) {
            throw new Error(`服务器超时，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`);
        } else if (jsonData.code === "1002") {
            throw new Error(`服务内部错误，请稍后重试！错误信息：${jsonData.data.error}|${jsonData.data.error_info}`)
        } else if (jsonData.code === "1004") {
            throw new Error(`用户隐藏战绩或者无战斗数据`)
        } else {
            return jsonData;
        }
    } else {
        throw new Error(`请求失败，状态码：${response.status}`);
    }
}
