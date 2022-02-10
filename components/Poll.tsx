import React from "react";
import Option, {OptionProps} from "./Option";

export type PollProps = {
    id: number;
    title: string;
    author: {
        name: string;
    } | null;
    options: Array<OptionProps>;
    published: boolean;
};

const Poll: React.FC<{ poll: PollProps }> = ({ poll }) => {
    const authorName = poll.author ? poll.author.name : "Anonymous";
    return (
        <div>
            <h2>{poll.title}</h2>
            <small>By {authorName}</small>
            <div>
                {poll.options.map((option: OptionProps) =>
                    <Option key={option.id} option={option} />
                )}
            </div>
        </div>
    );
}

export default Poll;