const { invoke } = require('@tauri-apps/api/tauri')
const { alert } = require('@tauri-apps/api/dialog')

const killPort = async () => {
  const port = document.getElementById('port').value
  try {
    const pid = await invoke('kill_port', { port })
    await alert(`Port ${port} has been terminated (PID: ${pid})`)
  } catch (error) {
    await alert(error.message)
  }
}

document.getElementById('kill').addEventListener('click', killPort)
