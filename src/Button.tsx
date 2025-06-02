
type ButtonPropsType = {
    text: string,
    onClickHandler?: () => void,
    disabled?: boolean,
}

export const Button = ({disabled, text, onClickHandler}: ButtonPropsType) => {
    return (
        <button disabled={disabled} onClick={onClickHandler} className="button">
            {text}
        </button>
    )
}







