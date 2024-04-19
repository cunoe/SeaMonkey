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
            }
        ];
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:data.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}