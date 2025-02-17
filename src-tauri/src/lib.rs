mod export_import;
use export_import::{import_file, export_file};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![import_file, export_file])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}


