import { ThemeStyle } from 'msteams-ui-components-react';

export var alertTypeEnum = Object.freeze({ "info": 0, "success": 1, "warning": 2, "error": 3 });

export const errorData = {
    message: '',
    type: alertTypeEnum.info
};

export function setTheme(themeStr) {
    let theme;
    switch (themeStr) {
        case 'dark':
            theme = ThemeStyle.Dark;
            break;
        case 'contrast':
            theme = ThemeStyle.HighContrast;
            break;
        case 'default':
        default:
            theme = ThemeStyle.Light;
    }
    return theme;
}

export function pageFontSize() {
    let sizeStr = window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size');
    sizeStr = sizeStr.replace('px', '');
    let fontSize = parseInt(sizeStr, 10);
    if (!fontSize) {
        fontSize = 16;
    }
    return fontSize;
}

export function inTeams() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (const varPairs of vars) {
        const pair = varPairs.split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

