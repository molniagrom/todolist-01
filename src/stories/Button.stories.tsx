import {Button} from "../Button.tsx";
import "../app/App.css";
import {ComponentProps} from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {fn} from "storybook/test";

type StoryProps = ComponentProps<typeof Button> & {
    buttonText: string;
};

const meta: Meta<StoryProps> = {
    component: Button,
    tags: ['autodocs'],
    // title: 'Components/Button',
    argTypes: {
        className: {
            options: ["btnFilterActive"],
            controls: {
                type: "select"
            }
        }
    },
    args: {
        onClickHandler: fn()
    }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Disabled: Story = {
    args: {
        text: 'Click me',
        disabled: true,
        className: 'disabled'
    },
};

export const Active: Story = {
    args: {
        text: 'Active',
        className: `btnFilterActive`
    },
};

export const WithChildren: Story = {
    args: {
        buttonText: "hello",
        disabled: false,
    },
    render: ({buttonText, ...args}) => {
        return <Button {...args}>
            With Children
        </Button>
    }
};


