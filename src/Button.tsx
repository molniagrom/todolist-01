import {PropsWithChildren} from "react";

type ButtonPropsType = PropsWithChildren<{
    text?: string,
    onClickHandler?: () => void,
    disabled?: boolean,
    className?: string
}>

export const Button = ({disabled, text, className, children, onClickHandler}: ButtonPropsType) => {
    return (
        <button disabled={disabled} onClick={onClickHandler} className={className}>
            {children ?? text}
        </button>
    )
}







