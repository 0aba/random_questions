use tauri_plugin_dialog::DialogExt;
use tauri::AppHandle;
use chrono::Local;
use std::fs;


#[tauri::command]
pub fn import_file(app: AppHandle) -> Result<String, String> {
    let path = app.dialog().file()
        .add_filter("JSON", &["json"])
        .blocking_pick_file();

    match path {
        Some(path) => {
            fs::read_to_string(path.to_string())
                .map_err(|e| e.to_string())
        },
        None => Err("Import error".into()),
    }
}

#[tauri::command]
pub fn export_file(app: AppHandle, json_data: serde_json::Value) -> Result<String, String> {

    let path = app.dialog().file()
        .set_file_name(format!("export-questions-{}", Local::now().format("%Y-%m-%d_%H-%M-%S").to_string()))
        .set_title("Save file")
        .add_filter("JSON", &["json"])
        .blocking_save_file();

    match path {
        Some(path) => {
            let json_data = serde_json::to_string_pretty(&json_data).map_err(|e| e.to_string())?;
            fs::write(&path.to_string(), json_data).map_err(|e| e.to_string())?;
            Ok(path.to_string())
        },
        None => Err("Export error".into()),
    }
}
