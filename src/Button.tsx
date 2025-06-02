
type ButtonPropsType = {
    text: string,
    onClickHandler?: () => void,
}

export const Button = ({text, onClickHandler}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler} className="button">
            {text}
        </button>
    )
}







