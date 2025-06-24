import {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    changeItemTitle: (newTitle: string) => void
    classes?: string
}

export const EditableSpan = ({title, classes, changeItemTitle}: EditableSpanType) => {

    const [editeMode, setEditeMode] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState(title)

    const createItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle((e.currentTarget.value))
    }

    const onEditeMode = () => setEditeMode(true)
    const offEditeMode = () => {
        setEditeMode(false)
        changeItemTitle(itemTitle)
    }

    return (
        editeMode
            ? <input
                autoFocus
                onBlur={offEditeMode}
                onChange={createItemTitle}
                value={itemTitle}
            />
            : <span className={classes}
                    onDoubleClick={onEditeMode}>{title}</span>
    );
};

