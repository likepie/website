import React, {useState} from "react";
import Option, {OptionProps, OptionFormProps} from "./Option";

export type PollProps = {
    id: number;
    title: string;
    author: {
        name: string;
    } | null;
    options: Array<OptionProps>;
    published: boolean;
};

interface PollFormProps {
    id: number;
    title: string;
    options: Array<OptionFormProps>;
}

export const Form: React.FC = () => {

    const [formState, setFormState] = useState<PollFormProps>({
        id: null,
        title: '',
        options: [{title: ''},{title: ''},{title: ''}]
    });

    const handleSubmit = (event) => {
        console.log(formState);
        event.preventDefault();
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name.includes('.')){
            const parts = name.split('.');

            console.log(parts);

            let current = {...formState};
            current[parts[0]][parts[1]][parts[2]] = value;
            setFormState(current);
            return;
        }

        setFormState((current) => {
            return {
                ...current,
                [name]: value
            };
        });
    }

    const handleAddOption = () => {
        let current = {...formState};
        current.options.push({title: ''})
        setFormState(current);
    };

    const handleRemoveOption = (index) => {
        let current = {...formState};
        current.options.splice(index, 1);
        setFormState(current);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" name={"title"} placeholder={"Type your question here..."} onChange={handleInputChange}
                   value={formState.title}/>

            {formState.options.map((option, index) => {
                return (
                    <div key={`option${index}`}>
                        <label>{index + 1}</label>
                        <input name={`options.${index}.title`} value={option.title} onChange={handleInputChange}/>
                        {index >= 3 ? (<button onClick={() => handleRemoveOption(index)}>Remove</button>) : ''}
                    </div>
                )
            })}

            <button disabled={formState.options.length >= 10} type={"button"} onClick={handleAddOption}>Add Option</button>
            <button type={"submit"}>Save</button>
        </form>
    );
};

const Poll: React.FC<{ poll: PollProps }> = ({poll}) => {
    const authorName = poll.author ? poll.author.name : "Anonymous";
    return (
        <div>
            <h2>{poll.title}</h2>
            <small>By {authorName}</small>
            <div>
                {poll.options.map((option: OptionProps) =>
                    <Option key={option.id} option={option}/>
                )}
            </div>
        </div>
    );
}

export default Poll;