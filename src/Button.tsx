
type ButtonPropsType = {
    text: string
}

export const Button = ({text}: ButtonPropsType) => {
    return (
        <button className="button">
            {text}
        </button>
    )
}







