// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;

use regex::Regex;
use tauri_plugin_sql::{Migration, MigrationKind};

// fn main() {
//     
//     tauri::Builder::default()
//         .plugin(tauri_plugin_sql::Builder::default()
//             .add_migrations("sqlite:data.db", migrations)
//             .build())
//         .invoke_handler(tauri::generate_handler![get_replays_temp_info, get_selected_realm])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

use tauri::{utils::config::AppUrl, window::WindowBuilder, WindowUrl};

fn main() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

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
            sql: "CREATE TABLE battle_history (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp INTEGER UNIQUE, start_time TIMESTAMP, kokomi_battle_id INTEGER, match_group TEXT, game_mode INTEGER, map_display_name TEXT, map_id INTEGER, players_per_team INTEGER, teams_count INTEGER, duration INTEGER, player_name TEXT, player_vehicle TEXT, scenario TEXT, teammate_server TEXT, enemy_server TEXT, tire INTEGER, raw_data TEXT);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:data.db", migrations)
            .build())
        .invoke_handler(tauri::generate_handler![get_replays_temp_info, get_selected_realm])
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            WindowBuilder::new(app, "main".to_string(), window_url)
                .title("SeaMonkey - 谁是海猴？")
                .fullscreen(false)
                .resizable(true)
                .min_inner_size(1440f64, 800f64)
                .build()?;
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}

// Return Code 1001 = replays directory exists but tempArenaInfo.json not found or empty
// Return Code 1002 = replays directory does not exist
#[tauri::command]
fn get_replays_temp_info(game_dir: String) -> Result<String, String> {
    let game_dir = Path::new(&game_dir);
    let replays_dir = game_dir.join("replays");

    if does_folder_exist(&replays_dir) {
        // 尝试读取文件，更明确地处理可能的错误
        let temp_arena_info_path = replays_dir.join("tempArenaInfo.json");
        match fs::read_to_string(&temp_arena_info_path) {
            Ok(text) => {
                if text.is_empty() {
                    // 文件存在但是为空
                    Err("1001".to_string()) // Return Code 1001 = replays directory exists but tempArenaInfo.json not found or empty
                } else {
                    // 成功读取非空文件
                    Ok(text) // Return the content of the file
                }
            },
            Err(_) => {
                // 文件不存在或无法读取
                Err("1001".to_string()) // Return Code 1001 = replays directory exists but tempArenaInfo.json not found or empty
            }
        }
    } else {
        // 目录不存在
        Err("1002".to_string()) // Return Code 1002 = replays directory does not exist
    }
}

// Return Code 1003 = other error
// Return Code 1002 = profile directory does not exist
// Return Code 1001 = profile directory exists but clientrunner.log not found or empty
// Return Code 1000 = selected realm not found
#[tauri::command]
fn get_selected_realm(game_dir: String) -> Result<String, String> {
    // Construct the path to the clientrunner.log file
    let game_dir = Path::new(&game_dir);
    let profile_dir = game_dir.join("profile");
    
    if does_folder_exist(&profile_dir) {
        let clientrunner_log_path = profile_dir.join("clientrunner.log");
        match fs::read_to_string(&clientrunner_log_path) { 
            Ok(text) => {
                // Compile the regex
                let re = match Regex::new(r"Selected realm:\s*(\S+)") {
                    Ok(re) => re,
                    Err(_) => return Err("1003".to_string()),
                };
                // Find matches
                    if let Some(caps) = re.captures_iter(&text).last() {
                        if let Some(matched) = caps.get(1) {
                            Ok(matched.as_str().to_string())  // Return the last matched group
                        } else {
                            Err("1000".to_string())  // Return Code 1000 = selected realm not found
                        }
                    } else {
                        Err("1000".to_string())  // Return Code 1000 = selected realm not found
                    }
            },
            Err(_) => {
                return Err("1001".to_string()); // Return Code 1001 = profile directory exists but clientrunner.log not found or empty
            }
        }
    } else {
        return Err("1002".to_string()); // Return Code 1002 = profile directory does not exist
    }
}

fn does_folder_exist(path: &Path) -> bool {
    fs::metadata(path).is_ok() && path.is_dir()
}