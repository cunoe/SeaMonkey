import type {NitroFetchOptions} from "nitropack";

const baseUrl = 'http://www.wows-coral.com:8000';
export interface defaultResponse<T> {
    code: string;
    data: T;
}

export interface defaultProfile {
    blt: number;
    wr: number;
    dmg: number;
    fr: number;
    exp: number;
    pr: number;
}

export interface BattleDataRequest {
    battle_id: string;
    battle_type: string;
    teammate_server: string;
    teammates: Teammate[];
    enemy_server: string;
    enemies: Enemy[];
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

export interface BattleDataItem {
    id: number;
    aid: number;
    nickname: string;
    clan: string | null;
    clan_type: number;
    hidden_profile: boolean;
    user_profile: defaultProfile;
    ship_profile: defaultProfile;
}

export interface BattleDataResponse {
    battle_id: string;
    battle_data: BattleDataItem[];
    error: string;
    error_info: string;
}

export const defaultBattleDataItem: BattleDataItem = {
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

// 删除机器人用户 一般是以 : 开头的用户
function filterBotUser(data: BattleDataRequest): BattleDataRequest{
    const teammates = data.teammates.filter(teammate => !teammate.name.startsWith(':'));
    const enemies = data.enemies.filter(enemy => !enemy.name.startsWith(':'));
    return {
        ...data,
        teammates,
        enemies
    }
}

export async function fetchBattleData(data: BattleDataRequest): Promise<BattleDataResponse> {
    return new Promise((resolve, reject) => {
      const reqUrl = `${baseUrl}/w/brief/`;
      const reqOptions: NitroFetchOptions<any> = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(filterBotUser(data)),
        timeout: 20000
      };

      const resp = $fetch(reqUrl, reqOptions);
      resp.then(({ code, data }: any) => {
          const value = data as BattleDataResponse;
          if (code === '1001') {
                reject(`服务器超时，请稍后重试！错误信息：${data.error}|${data.error_info}`);
          } else if (code === '1002') {
                reject(`服务内部错误，请稍后重试！错误信息：${data.error}|${data.error_info}`)
          } else if (code === '1003') {
              reject(`用户所在服务器不匹配，请检查服务器设置！`)
          } else {
                resolve(value);
          }
      }).catch((err) => {
          reject(`请求失败，错误信息：${err}`);
      })
    })
}

export interface PlayerDataRequest {
    aid: string;
    server: string;
}

export interface PlayerDataResponse {
    pr: defaultProfile
    bt: {
        pvp_solo: defaultProfile; // pvp_solo 战斗类型
        pvp_div2: defaultProfile; // pvp_div2 战斗类型
        pvp_div3: defaultProfile; // pvp_div3 战斗类型
        rank_solo: defaultProfile; // rank_solo 战斗类型
    };
    st: {
        AirCarrier: defaultProfile; // 航空母舰
        Battleship: defaultProfile; // 战列舰
        Cruiser: defaultProfile; // 巡洋舰
        Destroyer: defaultProfile; // 驱逐舰
        Submarine: defaultProfile; // 潜艇
    };
    error: string;
    error_info: string;
}

export async function fetchPlayerData(data: PlayerDataRequest): Promise<PlayerDataResponse> {
    return new Promise((resolve, reject) => {
        if (data.aid === '0') {
            reject(`请求无效`);
        }

        const reqUrl = `${baseUrl}/w/user-detail?aid=${data.aid}&server=${data.server}`;
        const reqOptions: NitroFetchOptions<any> = {
            method: 'GET',
            headers: getHeaders(),
            timeout: 20000
        };

        const resp = $fetch(reqUrl, reqOptions);
        resp.then(({ code, data }: any) => {
            const value = data as PlayerDataResponse;
            if (code === '1001') {
                reject(`服务器超时，请稍后重试！错误信息：${data.error}|${data.error_info}`);
            } else if (code === '1002') {
                reject(`服务内部错误，请稍后重试！错误信息：${data.error}|${data.error_info}`)
            } else if (code === '1004') {
                reject(`用户隐藏战绩或者无战斗数据`)
            } else {
                resolve(value);
            }
        }).catch((err) => {
            reject(`请求失败，错误信息：${err}`);
        })
    })
}

export interface ShipDataRequest {
    aid: string;
    server: string;
    ship_id: number;
}

export interface ShipDataResponse {
    pr: defaultProfile
    bt: {
        pvp_solo: defaultProfile; // pvp_solo 战斗类型
        pvp_div2: defaultProfile; // pvp_div2 战斗类型
        pvp_div3: defaultProfile; // pvp_div3 战斗类型
        rank_solo: defaultProfile; // rank_solo 战斗类型
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
    return new Promise((resolve, reject) => {
      if (data.ship_id === 0 || data.aid === '0') {
            reject(`请求无效`);
      }

        const reqUrl = `${baseUrl}/w/ship-detail?aid=${data.aid}&server=${data.server}&ship_id=${data.ship_id}`;
        const reqOptions: NitroFetchOptions<any> = {
            method: 'GET',
            headers: getHeaders(),
            timeout: 20000
        };

        const resp = $fetch(reqUrl, reqOptions);
        resp.then(({ code, data }: any) => {
            const value = data as ShipDataResponse;
            if (code === '1001') {
                reject(`服务器超时，请稍后重试！错误信息：${data.error}|${data.error_info}`);
            } else if (code === '1002') {
                reject(`服务内部错误，请稍后重试！错误信息：${data.error}|${data.error_info}`)
            } else if (code === '1004') {
                reject(`用户隐藏战绩或者无战斗数据`)
            } else {
                resolve(value);
            }
        }).catch((err) => {
            reject(`请求失败，错误信息：${err}`);
        })
    })
}
