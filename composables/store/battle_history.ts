import Database from "@tauri-apps/plugin-sql";

export interface BattleHistory {
    id: number;
    timestamp: number;
    start_time: Date;
    kokomi_battle_id: number;
    match_group: string;
    game_mode: number;
    map_display_name: string;
    map_id: number;
    players_per_team: number;
    teams_count: number;
    duration: number;
    player_name: string;
    player_vehicle: string;
    scenario: string;
    teammate_server: string;
    enemy_server: string;
    tire: number;
    raw_data: string;
}

export async function saveBattleHistory(battleHistory: {
    map_display_name: string;
    enemy_server: string;
    players_per_team: number;
    duration: number;
    start_time: Date;
    player_vehicle: any;
    teammate_server: string;
    match_group: string;
    map_id: number;
    scenario: string;
    game_mode: number;
    player_name: string;
    kokomi_battle_id: number;
    tire: number;
    raw_data: string;
    teams_count: number;
    timestamp: number;
}): Promise<number> {
    const db = await Database.load("sqlite:data.db");
    // 先查询是否存在相同 start_time 的记录
    const existingRecord: any = await db.select(`
        SELECT id FROM battle_history WHERE timestamp = $1;
    `, [battleHistory.timestamp]);
    // 如果存在相同 timestamp 的记录，则更新其他字段
    if (existingRecord.length > 0) {
        return db.execute(`
            UPDATE battle_history SET
                map_display_name = $1,
                enemy_server = $2,
                players_per_team = $3,
                duration = $4,
                player_vehicle = $5,
                teammate_server = $6,
                match_group = $7,
                map_id = $8,
                scenario = $9,
                game_mode = $10,
                player_name = $11,
                kokomi_battle_id = $12,
                raw_data = $13,
                teams_count = $14,
                start_time = $15,
                tire = $16
            WHERE timestamp = $17;
        `, [
            battleHistory.map_display_name,
            battleHistory.enemy_server,
            battleHistory.players_per_team,
            battleHistory.duration,
            battleHistory.player_vehicle,
            battleHistory.teammate_server,
            battleHistory.match_group,
            battleHistory.map_id,
            battleHistory.scenario,
            battleHistory.game_mode,
            battleHistory.player_name,
            battleHistory.kokomi_battle_id,
            battleHistory.raw_data,
            battleHistory.teams_count,
            battleHistory.start_time.toISOString(),
            battleHistory.tire,
            battleHistory.timestamp
        ]).then((res) => {
            return res.rowsAffected;
        });
    } else {
        // 如果不存在相同 timestamp 的记录，则插入新记录
        return db.execute(`
            INSERT INTO battle_history (
                timestamp,
                start_time,
                kokomi_battle_id,
                match_group,
                game_mode,
                map_display_name,
                map_id,
                players_per_team,
                teams_count,
                duration,
                player_name,
                player_vehicle,
                scenario,
                teammate_server,
                enemy_server,
                tire,
                raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);
        `, [
            battleHistory.timestamp,
            battleHistory.start_time.toISOString(),
            battleHistory.kokomi_battle_id,
            battleHistory.match_group,
            battleHistory.game_mode,
            battleHistory.map_display_name,
            battleHistory.map_id,
            battleHistory.players_per_team,
            battleHistory.teams_count,
            battleHistory.duration,
            battleHistory.player_name,
            battleHistory.player_vehicle,
            battleHistory.scenario,
            battleHistory.teammate_server,
            battleHistory.enemy_server,
            battleHistory.tire,
            battleHistory.raw_data
        ]).then((res) => {
            return res.rowsAffected;
        });
    }
}

export async function listLastBattleHistory(limit: number, offset: number): Promise<BattleHistory[]> {
    const db = await Database.load("sqlite:data.db");
    return db.select(`
        SELECT * FROM battle_history ORDER BY timestamp DESC LIMIT $1 OFFSET $2;
    `, [limit, offset]).then((res: any) => {
        if (res.length > 0) {
            return res as BattleHistory[];
        } else {
            return [];
        }
    });
}

export async function getBattleHistoryById(id: number): Promise<BattleHistory | null> {
    const db = await Database.load("sqlite:data.db");
    return db.select(`
        SELECT * FROM battle_history WHERE id = $1;
    `, [id]).then((res: any) => {
        if (res.length > 0) {
            return res[0] as BattleHistory;
        } else {
            return null;
        }
    });
}

export async function getLatestBattleHistory(): Promise<BattleHistory | null> {
    const db = await Database.load("sqlite:data.db");
    return db.select(`
        SELECT * FROM battle_history ORDER BY timestamp DESC LIMIT 1;
    `).then((res: any) => {
        if (res.length > 0) {
            return res[0] as BattleHistory;
        } else {
            return null;
        }
    })
}