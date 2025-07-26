import {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {IconButton, TextField} from "@mui/material";

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
            <TextField
                size="small"
                variant={"outlined"}
                onKeyDown={onKeyDownCreateTaskHandler}
                onChange={createItemTitle}
                helperText={error && "Title must be valid"}
                error={error}
                value={itemTitle} placeholder={`max ${itemTitleLength} symbol`}/>

            <IconButton
                disabled={isAddBtrDisableCondition}
                color={"primary"}
                onClick={createTaskHandler}>
                <AddBoxIcon fontSize="medium"/>
            </IconButton>

            {itemTitle && itemTitle.length <= itemTitleLength && <p>max {itemTitleLength} symbol</p>}
            {itemTitle && itemTitle.length > itemTitleLength && <p style={{color: "red"}}>"title is too long"</p>}
        </div>
    );
};

export default CreateItemForm;