import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button.tsx";

type Props = {
    createItem: (itemTitle: string) => void;
    itemTitleLength: number;
}

export const CreateItemForm = ({createItem, itemTitleLength }: Props) => {
    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState(false)
    const isAddBtrDisableCondition = itemTitle === "" || itemTitle.length > itemTitleLength

    const createTaskHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle("")
    }

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddBtrDisableCondition) {
            createTaskHandler()
        }
    }


    const createItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemTitle((e.currentTarget.value))
    }

    return (
        <div>
            <input
                className={error ? "inputError" : ""}
                onKeyDown={onKeyDownCreateTaskHandler}
                onChange={createItemTitle}
                value={itemTitle} placeholder={`max ${itemTitleLength} symbol`}/>
            <Button disabled={isAddBtrDisableCondition}
                    onClickHandler={createTaskHandler} text={"+"}/>
            {itemTitle && itemTitle.length <= itemTitleLength && <p>max {itemTitleLength} symbol</p>}
            {itemTitle && itemTitle.length > itemTitleLength && <p style={{color: "red"}}>"title is too long"</p>}
            {error && <><br/>
                <div style={{color: "red"}}>Title must be valid</div>
            </>}
        </div>
    );
};

export default CreateItemForm;