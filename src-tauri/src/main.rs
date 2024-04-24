// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {
    let migrations = vec![
            Migration {
                version: 1,
                description: "kv_database",
                sql: "CREATE TABLE properties (key TEXT PRIMARY KEY, value TEXT);",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 2,
                description: "game_battle_history",
                sql: "CREATE TABLE battle_history (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp INTEGER UNIQUE, start_time TIMESTAMP, kokomi_battle_id INTEGER, match_group TEXT, game_mode INTEGER, map_display_name TEXT, map_id INTEGER, players_per_team INTEGER, teams_count INTEGER, duration INTEGER, player_name TEXT, player_vehicle TEXT, scenario TEXT, teammate_server TEXT, enemy_server TEXT, raw_data TEXT);",
                kind: MigrationKind::Up,
            }
        ];
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:data.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}