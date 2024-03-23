document.addEventListener('DOMContentLoaded', function () {
  const link = document.querySelector('h1 a');
  link.addEventListener('click', function (event) {
      event.preventDefault(); // to prevent the default link behavior
      const url = link.getAttribute('href');
      window.tauri.shell.open(url)
          .then(() => console.log('Link opened successfully'))
          .catch(error => console.error('Error opening link:', error));
  });
});

const killPort = () => {
   const port = document.getElementById('port').value;
   if (!port) {
       alert('Please enter a port number.');
       return;
   }
 
   window.__TAURI__.invoke('kill_port', { port })
       .then(() => alert(`Port ${port} killed successfully.`))
       .catch(error => alert(`Failed to kill port ${port}.`));
}

document.getElementById('killButton').addEventListener('click', killPort);

document.getElementById('port').addEventListener('keydown', (event)=>{
   if (event.key === 'Enter') killPort()
 });

const quitApplication = () => {
  window.__TAURI__.invoke('quit_application')
    .then(() => console.log('Application quit successfully'))
    .catch(error => console.error('Error quitting application:', error));
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault(); 
    quitApplication();
  }
});

