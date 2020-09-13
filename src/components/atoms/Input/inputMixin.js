import mainTheme from 'themes/mainTheme';

export const inputMixin = () => (
    `
    display: block;
    width: 100%;
    height: 45px;
    padding: 15px 50px 5px 25px;
    background-color: ${mainTheme.color.white};
    border: none;
    border-radius: 26px;
    color: ${mainTheme.color.darkblue};
    box-shadow: inset 4px 4px 8px ${mainTheme.color.darkgrey};
    line-height: 1;
    overflow: hidden;
    -webkit-appearance: none;
    -moz-appearance: none;
    &::-ms-expand{
        display: none;
        }
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
        position: relative;
    }
    &:focus {
        outline: none;
        box-shadow: inset 0 0 10px ${mainTheme.color.darkblue};
    }
    &:focus ~label, &:not(:placeholder-shown) ~label {
        transform: scale(.6) translate(-40%, -200%);
    }
    `
)