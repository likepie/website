import React from "react";

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