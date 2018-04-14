const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const $ = require('jquery');

function createWindow()
{
    win = new BrowserWindow({width: 1920, height: 1080, icon: path.join(__dirname, '../../gui/img/icon.png'), title: "Ya4r"});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../gui/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') 
    {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null)
    {
        createWindow();
    }
});

/*
app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});
*/

/* TEST */

