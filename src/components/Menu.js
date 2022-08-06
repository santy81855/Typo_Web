import '../styles/Menu.css';
import Logo from "../images/logo.ico";
import ProfileButton from "../images/profileIcon.png";
import SettingsButton from "../images/settings_white.png";

{/**/}

export default function Menu() {
  return (
    <div className="Menu">  
      {/*Logo on the left of the menu needs to be a button*/}
      <button type="button" className="MenuLogo">
        <img src={Logo} alt="logo" class="Logo" />
        <a className="LogoText">ypo</a>
      </button>
      {/*Next item will be a profile button*/}
      <button type="button" className="ProfileButton">
        <img src={ProfileButton} alt="logo" class="ProfilePicture" />
        <a className="MenuText">Login</a>
      </button>
      {/*Next item will be a settings button*/}
      <button type="button" className="SettingsButton">
        <img src={SettingsButton} alt="logo" class="SettingsPicture" />
        <a className="MenuText">Settings</a>
      </button>
    </div>
  );
}