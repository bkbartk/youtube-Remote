# YouTube-Remote-Control<br>
YouTube-Remote-Control for HA<br>
<br>
This Remote is not done yet<br>
but the remote will work in conjunction with<br>
some youtube box you have created<br>
<br>
And is based on<br>
https://github.com/madmicio/LG-WebOS-Remote-Control<br>
All the credits for the design go to: madmicio<br>

installation:<br>
HACS:<br>
1. Go to HACS<br>
2. Click FrontEnd http://homeassistant:8123/hacs/frontend<br>
3. Click 3 dots in the top right corner and Select "Custom repositories"<br>
3. Scrol down and Add: <br>
    url: https://github.com/bkbartk/youtube-Remote<br>
    category: Lovelace<br>
4. in the dashboard add a Card like the sample below<br>
<br>
MANUAL<br>
1. copy: "youtube-remote-control.js" to "~\config\www\community\youtube-Remote\youtube-remote-control.js"<br>
 using git or some other method<br>
2. in Ha go to Configuration\Loveace Dashboard\ resources http://homeassistant:8123/config/lovelace/resources<br>
3. click add resource and add: "\hacsfiles\youtube-Remote\youtube-remote-control.js" Javascript Module<br>
4. in the dashboard add a Card like the sample below<br>

Usage Sample: 
```yaml
type: custom:youtube-remote-control
entity: media_player.mediabox
volumeEntity: media_player.living_room_tv
volumeService: webostv
colors:
  buttons: var(--deactive-background-button-color)
```

volume services are separate so you can connect then to your tv.
if you don't have a supporting tv you should add dummy values.


in your configuation.yaml add something like this
```yaml
shell_command:
  youtube_key: "ssh -i /config/.ssh/id_rsa -o 'StrictHostKeyChecking=no' <user>@<ip address>  'export DISPLAY=:0 && xdotool key --window \"$(xdotool search --class Chromium1 | head -1)\" {{key}}'"
```
where of cours ipaddress and user should be replaces with the user and ip address of the youtube RPI.

