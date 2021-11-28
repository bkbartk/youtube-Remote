var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;
var css = LitElement.prototype.css;

class YouTubeRemoteControl extends LitElement {

    static get properties() {
        return {
            hass: {},
            config: {},
            _show_inputs: {},
            _show_text: {},
            _show_keypad: {}
        };
    }

    constructor() {
        super();
        this._show_inputs = false;
        this._show_text = false;
        this._show_keypad = false;
    }

    render() {
        const volumeStateObj = this.hass.states[this.config.volumeEntity];

        const borderWidth = this.config.dimensions && this.config.dimensions.border_width ? this.config.dimensions.border_width : "1px";
        const scale = this.config.dimensions && this.config.dimensions.scale ? this.config.dimensions.scale : 1;
        const remoteWidth = Math.round(scale * 260) + "px";

        const backgroundColor = this.config.colors && this.config.colors.background ? this.config.colors.background : "var(--primary-background-color)";
        const borderColor = this.config.colors && this.config.colors.border ? this.config.colors.border: "var(--app-header-text-color)";
        const buttonColor = this.config.colors && this.config.colors.buttons ? this.config.colors.buttons : "#f2f0fa";
        const textColor = this.config.colors && this.config.colors.texts ? this.config.colors.texts : "var(--primary-text-color)";

        return html`
            <div class="card">
            <div class="page" style="--remote-button-color: ${buttonColor}; --remote-text-color: ${textColor}; --remote-color: ${backgroundColor}; --remotewidth: ${remoteWidth};  --main-border-color: ${borderColor}; --main-border-width: ${borderWidth}">
                  <div class="grid-container-power"  style="--remotewidth: ${remoteWidth}">
                      <button class="btn ripple" @click=${() => this._media_player_service("media_player","toggle")}><ha-icon icon="mdi:power" style="color: red;"/></button>
                  </div> 
                 ${this._show_inputs ? html`
<!-- ################################# SOURCES ################################# -->
                  <div class="grid-container-input">
                  <div class="shape-input">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130"><path d="m 187 43 a 30 30 0 0 0 60 0 a 30 30 0 0 0 -60 0 M 148 12 a 30 30 0 0 1 30 30 a 40 40 0 0 0 40 40 a 30 30 0 0 1 30 30 v 18 h -236 v -88 a 30 30 0 0 1 30 -30" fill="var(--remote-button-color)" stroke="#000000" stroke-width="0" /></svg>
                   </div>   
                    <button class="ripple bnt-input-back" @click=${() => this._show_inputs = false}><ha-icon icon="mdi:undo-variant"/></button>
                    <p class="source_text"><b>SOURCE</b></p>
                  <div class="grid-item-input">
                    ${stateObj.attributes.source_list.map(source => html`
                    <button class="${stateObj.attributes.source === source ? 'btn-input-on' : 'btn-input  ripple overlay'}" @click=${() => {
                        this._select_source(source);
                        this._show_inputs = false;
                    }}>${source}</button>
                    `)}
                  </div>
<!-- ################################# SOURCES END ################################# -->
                 ` : html`
                    ${this._show_keypad ? html`
<!-- ################################ keypad ################################## -->
                    <div class="grid-container-keypad">
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","1")}>1</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","2")}>2</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","3")}>3</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","4")}>4</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","5")}>5</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","6")}>6</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","7")}>7</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","8")}>8</button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","9")}>9</button>
                        <button class="btn-keypad"></button>
                        <button class="btn-keypad ripple" @click=${() => this._remote_key_press("arris_dcx960","0")}>0</button>
                        <button class="btn-keypad"></button>
                  </div>
  <!-- ################################# keypad end ############################## --> 
                 ` : html`
<!-- ################################# DIRECTION PAD ################################# -->
                  <div class="grid-container-cursor">
                  <div class="shape">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 79"><path d="m 30 15 a 10 10 0 0 1 20 0 a 15 15 0 0 0 15 15 a 10 10 0 0 1 0 20 a 15 15 0 0 0 -15 15 a 10 10 0 0 1 -20 0 a 15 15 0 0 0 -15 -15 a 10 10 0 0 1 0 -20 a 15 15 0 0 0 15 -15" fill="var(--remote-button-color)" stroke="#000000" stroke-width="0" /></svg>
                    </div> 
                      <button class="btn ripple item_up" style="background-color: transparent;" @click=${() => this._remote_key_press("Up")}><ha-icon icon="mdi:chevron-up"/></button>
                      <button class="btn ripple item_2_sx" style="background-color: transparent;" @click=${() => this._remote_key_press("Left")}><ha-icon icon="mdi:chevron-left"/></button>
                      <button class="btn bnt_ok ripple item_2_c" style="border: solid 2px ${backgroundColor}"  @click=${() => this._remote_key_press("KP_Enter")}>OK</button>
                      <button class="btn ripple item_right" style="background-color: transparent;" @click=${() => this._remote_key_press("Right")}><ha-icon icon="mdi:chevron-right"/></button>
                      <button class="btn ripple item_back" @click=${() => this._remote_key_press("Escape")}><ha-icon icon="mdi:undo-variant"/></button>
                      <button class="btn ripple item_down" style="background-color: transparent;" @click=${() => this._remote_key_press("Down")}><ha-icon icon="mdi:chevron-down"/></button>
                    </div>
<!-- ################################# DIRECTION PAD END ################################# -->
                
                  `}

                  <div class="grid-container-volume-channel-control" >
                      <button class="btn ripple"  style="border-radius: 50% 50% 0px 0px; margin: 0px auto 0px auto; height: 100%;" @click=${() => this._volume_media_player_service("volume_up")}><ha-icon icon="mdi:plus"/></button>
                      <button class="btn-flat flat-high ripple" style="margin-top: 0px; height: 50%;" @click=${() => this._remote_key_press("arris_dcx960","MediaTopMenu")}><ha-icon icon="mdi:home"></button>
                      <button class="btn ripple" style="border-radius: 50% 50% 0px 0px; margin: 0px auto 0px auto; height: 100%;" @click=${() => this._remote_key_press("arris_dcx960","ChannelUp")}><ha-icon icon="mdi:chevron-up"/></button>
                      <button class="btn" style="border-radius: 0px; cursor: default; margin: 0px auto 0px auto; height: 100%;"><ha-icon icon="${volumeStateObj.attributes.is_volume_muted === true ? 'mdi:volume-off' : 'mdi:volume-high'}"/></button>
                      <button class="btn ripple" Style="color:${volumeStateObj.attributes.is_volume_muted === true ? 'red' : ''}; height: 100%;"" @click=${() => this._volume_button("MUTE")}><span class="${volumeStateObj.attributes.is_volume_muted === true ? 'blink' : ''}"><ha-icon icon="mdi:volume-mute"></span></button>
                      <button class="btn" style="border-radius: 0px; cursor: default; margin: 0px auto 0px auto; height: 100%;"><ha-icon icon="mdi:parking"/></button>
                      <button class="btn ripple" style="border-radius: 0px 0px 50% 50%;  margin: 0px auto 0px auto; height: 100%;" @click=${() => this._volume_media_player_service("volume_down")}><ha-icon icon="mdi:minus"/></button>
                      <button class="btn-flat flat-low ripple" style="color: red;" @click=${() => this._media_player_service("arris_dcx960","record")}><ha-icon icon="mdi:record"/></button>
                      <button class="btn ripple" style="border-radius: 0px 0px 50% 50%;  margin: 0px auto 0px auto; height: 100%;"  @click=${() => this._remote_key_press("arris_dcx960","ChannelDown")}><ha-icon icon="mdi:chevron-down"/></button>
                  </div>

<!-- ################################# MEDIA CONTROL ################################# -->
                 <div class="grid-container-media-control" >
                      <button class="btn-flat flat-low ripple"  @click=${() => this._remote_key_press("Left")}><ha-icon icon="mdi:skip-backward"/></button>
                      <button class="btn-flat flat-low ripple"  @click=${() => this._remote_key_press("KP_Space")}><ha-icon icon="mdi:play-pause"/></button>
                      <button class="btn-flat flat-low ripple"  @click=${() => this._remote_key_press("Right")}><ha-icon icon="mdi:skip-forward"/></button>
                  </div> 
<!-- ################################# MEDIA CONTROL END ################################# -->
                  </div>
                `}
                </div>
              </div>
            `;
    }

    _button(type,button) {
        this.hass.callService(type, "button", {
            entity_id: this.config.entity,
            button: button
        });
    }
    
    _volume_button(button) {
        this.hass.callService(this.config.volumeService, "button", {
            entity_id: this.config.volumeEntity,
            button: button
        });
    }


    _remote_key_press(key) {
        this.hass.callService("shell_command", "youtube_key", {
            key: key
        });
    }

    _media_player_service(type,service) {
        this.hass.callService(type, service, {
            entity_id: this.config.entity
        });
    }

    _volume_media_player_service(service) {
        this.hass.callService("media_player", service, {
            entity_id: this.config.volumeEntity,
        });
    }

    _select_source(source) {
        this.hass.callService("media_player", "select_source", {
            entity_id: this.config.entity,
            source: source
        });
    }

    setConfig(config) {
        if (!config.entity) {
            console.log("Invalid configuration");
        }
        this.config = config;
    }

    getCardSize() {
        return 15;
    }

    static getIcon(iconName) {
        return html`<ha-icon style="height: 70%; width: 70%;" icon="${iconName}"/>`;
    }

    static get styles() {
        return css`

        button:focus {
          outline:0;
      }
      /*Create ripple effec*/
       .ripple {
           position: relative;
           overflow: hidden;
           transform: translate3d(0, 0, 0);
      }
       .ripple:after {
           content: "";
           display: block;
           position: absolute;
           border-radius: 50%;
           width: 100%;
           height: 100%;
           top: 0;
           left: 0;
           pointer-events: none;
           background-image: radial-gradient(circle, #7a7f87 2%, transparent 10.01%);
           background-repeat: no-repeat;
           background-position: 50%;
           transform: scale(10, 10);
           opacity: 0;
           transition: transform .5s, opacity 1s;
      }
       .ripple:active:after {
           transform: scale(0, 0);
           opacity: .3;
           transition: 0s;
      }
       .blink {
           animation: blinker 1.5s linear infinite;
           color: red;
      }
       @keyframes blinker {
           50% {
               opacity: 0;
          }
      }
       .card {
           display: flex;
           justify-content: center;
           width: 100%;
           height: 100%;
      }
       .page {
           background-color: var(--remote-color);
           height: 100%;
           display: inline-block;
           flex-direction: row;
           border: var(--main-border-width) solid var(--main-border-color);
           border-radius: calc(var(--remotewidth) / 7.5);
           padding: calc(var(--remotewidth) / 37.5) calc(var(--remotewidth) / 15.2) calc(var(--remotewidth) / 11) calc(var(--remotewidth) / 15.2);
      }
       .grid-container-power {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: 1fr;
           background-color: transparent;
           overflow: hidden;
           width: var(--remotewidth);
           height: calc(var(--remotewidth) / 3);
      }
       .grid-container-cursor {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: 1fr 1fr 1fr;
           overflow: hidden;
           height: var(--remotewidth);
           width: var(--remotewidth);
           grid-template-areas: "sound up input" "left ok right" "back down exit" 
      }
       .grid-container-keypad {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: 1fr 1fr 1fr 1fr;
           background-color: transparent;
           overflow: hidden;
           background-color: var(--remote-button-color);
           border-radius: 35px;
           height: var(--remotewidth);
           width: calc(var(--remotewidth) - 10%);
           margin: auto;
      }
       .grid-container-input {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: calc(var(--remotewidth) / 2) calc(var(--remotewidth) / 0.5115);
           background-color: transparent;
           overflow: hidden;
           width: var(--remotewidth);
      }
       .grid-container-sound {
           display: grid;
           grid-template-columns: 1fr 1fr;
           grid-template-rows: 28% 6% 16% 16% 16% 16% 6%;
           background-color: transparent;
           overflow: hidden;
           height: var(--remotewidth);
           width: var(--remotewidth);
           grid-template-areas: "bnt title" ". ." "tv tv-opt" "tv-phone opt" "hdmi line" "phone bluetooth" 
      }
       .grid-container-source {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr 1fr;
           grid-template-rows: auto;
           background-color: transparent;
           width: calc(var(--remotewidth) / 1.03);
           overflow: hidden;
           margin: auto;
      }

        .grid-container-color_btn{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: auto;
            background-color: transparent;
            width: calc(var(--remotewidth) / 1.03);
            height: calc(var(--remotewidth) / 10);
            overflow: hidden;
            margin: auto;
        }

        .grid-container-volume-channel-control {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: 1fr 1fr 1fr;
           background-color: transparent;
           width: var(--remotewidth);
           height: calc(var(--remotewidth) / 1.4);
           overflow: hidden;
           margin-top: calc(var(--remotewidth) / 12);
          ;
      }
       .grid-container-media-control {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           grid-template-rows: 1fr 1fr;
           background-color: transparent;
           width: var(--remotewidth);
           height: calc(var(--remotewidth) / 2.85);
           overflow: hidden;
           margin-top: calc(var(--remotewidth) / 12);
          ;
      }
      /* .grid-item {
           background-color: transparent;
           margin: auto;
           overflow: hidden;
      }
       */
       .grid-item-input{
           grid-column-start: 1;
           grid-column-end: 4;
           grid-row-start: 1;
           grid-row-end: 3;
           display: grid;
           grid-template-columns: auto;
           background-color: var(--remote-button-color);
           margin:auto;
           margin-top: calc(var(--remotewidth) / 2.6);
           overflow: scroll;
           height: calc(var(--remotewidth) * 2.01);
           width: calc(var(--remotewidth) - 9%);
           border-radius: calc(var(--remotewidth) / 12);
      }
       .grid-item-input::-webkit-scrollbar {
           display: none;
      }
       .grid-item-input::-webkit-scrollbar {
           -ms-overflow-style: none;
      }
       .shape {
           grid-column-start: 1;
           grid-column-end: 4;
           grid-row-start: 1;
           grid-row-end: 4;
           padding: 5px;
      }
       .shape-input {
           grid-column-start: 1;
           grid-column-end: 4;
           grid-row-start: 1;
           grid-row-end: 3;
      }
       .shape-sound {
           grid-column-start: 1;
           grid-column-end: 5;
           grid-row-start: 1;
           grid-row-end: 6;
      }
       .source_text {
           grid-column-start: 1;
           grid-column-end: 3;
           grid-row-start: 1;
           grid-row-end: 2;
           text-align: center;
           margin-top: calc(var(--remotewidth) / 6);
           font-size: calc(var(--remotewidth) / 10);
           opacity: 0.3;
      }
       .icon_source {
           height: 65%;
           width: 65%;
      }
       .sound_icon_text {
           background-color: transparent;
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.75);
           width: 70%;
           height: 70%;
           border-width: 0px;
           margin:auto auto 0px 0px;
           overflow: hidden;
           grid-area: title;
           cursor: pointer;
      }
       .btn_soundoutput {
           font-size: calc(var(--remotewidth) / 12.5);
           width: 70%;
           height: 70%;
           border-width: 0px;
           margin:auto auto 0px 0px;
           display: block;
           cursor: pointer;
           background-color: transparent;
           opacity: 0.4;
           color: var(--remote-text-color) font-weight: bold;
           grid-area: title;
      }
       .tv {
           grid-area: tv;
      }
       .tv-opt {
           grid-area: tv-opt;
      }
       .tv-phone {
           grid-area: tv-phone;
      }
       .opt {
           grid-area: opt;
      }
       .hdmi {
           grid-area: hdmi;
      }
       .phone {
           grid-area: phone;
      }
       .line {
           grid-area: line;
      }
       .bluetooth {
           grid-area: bluetooth;
      }
       .item_sound {
           grid-area: sound;
      }
       .item_up {
           grid-area: up;
      }
       .item_input {
           grid-area: input;
      }
       .item_2_sx{
           grid-area: left;
      }
       .item_2_c {
           grid-area: ok;
      }
       .item_right {
           grid-area: right;
      }
       .item_back {
           grid-area: back;
      }
       .item_down {
           grid-area: down;
      }
       .item_exit {
           grid-area: exit;
      }
       ha-icon {
           width: calc(var(--remotewidth) / 10.8);
           height: calc(var(--remotewidth) / 10.8); 
      }
       .btn {
           background-color: var(--remote-button-color);
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.75);
           width: 70%;
           height: 70%;
           border-width: 0px;
           border-radius: 50%;
           margin: auto;
           place-items: center;
           display: inline-block;
           cursor: pointer;
      }
       .bnt-input-back {
           grid-column-start: 3;
           grid-column-end: 4;
           grid-row-start: 1;
           grid-row-end: 2;
           background-color: transparent;
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.75);
           width: 70%;
           height: 50%;
           border-width: 0px;
           border-radius: 50%;
           margin-top: calc(var(--remotewidth) / 21);
           margin-left: calc(var(--remotewidth) / 21);
           place-items: center;
           display: inline-block;
           cursor: pointer;
      }
       .bnt-sound-back {
           margin-left: 0px;
           grid-area: bnt;
           background-color: transparent;
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.75);
           width: 45%;
           height: 83%;
           border-width: 0px;
           border-radius: 50%;
           margin-top: calc(var(--remotewidth) / 21);
           margin-left: calc(var(--remotewidth) / 18);
           place-items: center;
           display: inline-block;
           cursor: pointer;
      }
       .btn-keypad {
           background-color: transparent;
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 10);
           width: 100%;
           height: 100%;
           border-width: 0px;
      }
       .btn_source {
           background-color: var(--remote-button-color);
           color: var(--remote-text-color);
           width: calc(var(--remotewidth) / 5.9);
           height: calc(var(--remotewidth) / 8.125);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 10);
           margin: calc(var(--remotewidth) / 18.57) auto calc(var(--remotewidth) / 20) auto;
           place-items: center;
           cursor: pointer;
      }
        .btn-color {
            background-color: var(--remote-button-color);
            color: var(--remote-text-color);
            width: 70%;
            height: 55%;
            border-width: 0px;
            border-radius: calc(var(--remotewidth) / 10);
            margin: auto;
            place-items: center;
            cursor: pointer;
        }   

       .icon_source {
           height: 100%;
           width: 100%;
      }
       .btn-input {
           background-color: var(--remote-button-color);
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.5);
           calc(var(--remotewidth) / 1.3);
           height: calc(var(--remotewidth) / 7.2226);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 20);
           margin: calc(var(--remotewidth) / 47); auto;
           place-items: center;
           display: list-item;
           cursor: pointer;
           border: solid 2px var(--remote-color);
      }
       .btn-input-on {
           background-color: var(--primary-color);
           color: #ffffff;
           font-size: calc(var(--remotewidth) / 18.5);
           calc(var(--remotewidth) / 1.3);
           height: calc(var(--remotewidth) / 7.2226);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 20);
           margin: calc(var(--remotewidth) / 47); auto;
           place-items: center;
           display: list-item;
           cursor: pointer;
      }
       .bnt_sound_icon_width {
           width: calc(var(--remotewidth) / 3);
      }
       .bnt_sound_text_width {
           width: calc(var(--remotewidth) / 2.6);
      }
       .btn_sound_on {
           font-size: calc(var(--remotewidth) / 25);
           height: calc(var(--remotewidth) / 9.3);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 20);
           margin: auto;
           display: block;
           cursor: pointer;
           background-color: var(--primary-color);
           color: #ffffff;
      }
       .btn_sound_off {
           font-size: calc(var(--remotewidth) / 25);
           height: calc(var(--remotewidth) / 9.3);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 20);
           margin: auto;
           display: block;
           cursor: pointer;
           background-color: var(--remote-button-color);
           color: var(--remote-text-color);
           border: solid 2px var(--remote-color);
      }
       .overlay {
           background-color: rgba(0,0,0,0.02) 
      }
       .flat-high {
           width: 70%;
           height: 37%;
      }
       .flat-low {
           width: 70%;
           height: 65%;
      }
       .btn-flat {
           background-color: var(--remote-button-color);
           //rgba(255, 0, 0, 1);
           color: var(--remote-text-color);
           font-size: calc(var(--remotewidth) / 18.75);
           border-width: 0px;
           border-radius: calc(var(--remotewidth) / 10);
           margin: auto;
           display :grid;
           place-items: center;
           display: inline-block;
           cursor: pointer;
      }
       .bnt_ok {
           width: 100%;
           height:100%;
           font-size: calc(var(--remotewidth) / 16.6);
           // border: solid 2px var(--backgroundcolor
      }
  `;
    }

}

customElements.define('youtube-remote-control', YouTubeRemoteControl);
