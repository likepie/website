import React from "react";

export interface OptionFormProps {
    title: string
}

export type OptionProps = {
    id: number;
    title: string;
};

const Option: React.FC<{ option: OptionProps }> = ({ option }) => {
    return (
        <div>
            {option.title}
        </div>
    )
}

export default Option;