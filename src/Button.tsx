
type ButtonPropsType = {
    text: string,
    onClickHandler?: () => void,
    disabled?: boolean,
    className?: string
}

export const Button = ({disabled, text, className, onClickHandler}: ButtonPropsType) => {
    return (
        <button disabled={disabled} onClick={onClickHandler} className={className}>
            {text}
        </button>
    )
}







