
import { inputChangeTheme } from "./refs";

const svgWhite = document.querySelector('.modal__close-btn');
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
const {LIGHT, DARK} = Theme;
document.body.classList.add(LIGHT); 
const handleInputChange = (e) => { 
    if(e.target.checked) {
        document.body.classList.replace(LIGHT, DARK);
        localStorage.setItem("Theme", DARK);
    } else {
        document.body.classList.replace(DARK, LIGHT);
        localStorage.setItem("Theme", LIGHT);
    }
}
const localStorageTheme = () => { 
    if(localStorage.getItem("Theme") === "dark-theme") {
        inputChangeTheme.checked = "true";
        document.body.classList.replace(LIGHT, DARK);
    }
    return
}
inputChangeTheme.addEventListener("change", handleInputChange);
localStorageTheme()
