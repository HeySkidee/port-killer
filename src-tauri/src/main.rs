use tauri::Builder;
use std::process::Command;
use log::{info, error};

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![kill_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn kill_port(port: String) -> Result<(), String> {
    let command = format!("pkexec sh -c \"kill -9 $(lsof -t -i:{})\"", port);
    info!("Attempting to kill port: {}", port);
    let output = Command::new("sh")
        .arg("-c")
        .arg(&command)
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        error!("Failed to kill port {}: {}", port, String::from_utf8_lossy(&output.stderr));
        return Err(String::from_utf8_lossy(&output.stderr).into_owned());
    }

    info!("Successfully killed port: {}", port);
    Ok(())
}
