import React from "react";

export interface OptionFormProps {
    title: string
}

export type OptionProps = {
    id: number;
    title: string;
};

const Option: React.FC<{ option: OptionProps, multipleChoice: Boolean }> = ({ option,multipleChoice }) => {
    return (
        <label>
            <input name={"answer"} value={option.id} type={multipleChoice ? 'checkbox' : 'radio'} />
            {option.title}
        </label>
    )
}

export default Option;