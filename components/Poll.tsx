import React, {useEffect, useState} from "react";
import Option, {OptionProps, OptionFormProps} from "./Option";

export type PollProps = {
    id: number;
    title: string;
    author: {
        name: string;
    } | null;
    options: Array<OptionProps>;
    published: boolean;
    private: boolean;
    multipleChoice: boolean;
};

export interface PollFormProps {
    uid: string;
    title: string;
    options: Array<OptionFormProps>;
    private: boolean;
    multipleChoice: boolean;
}

export const Form: React.FC = () => {

    const [formState, setFormState] = useState<PollFormProps>({
        uid: '',
        title: '',
        options: [{title: ''},{title: ''},{title: ''}],
        private: false,
        multipleChoice: false
    });

    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    // Validate formState when it changes, if found to be valid submit button becomes enabled
    // - Title must be set
    // - Two or more options must be set
    useEffect(() => {
        if (formState.title.length > 0) {
            const options = formState.options.reduce((carry, option) => {
                if (option.title.length) {
                    carry.push(option.title.length);
                }
                return carry;
            }, [])

            if (options.length >= 2){
                return setCanSubmit(true);
            }
        }
        setCanSubmit(false);
    }, [formState]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const body = Object.assign({}, formState);
            body.options = body.options.filter(option => option.title.length > 0);

            await fetch('api/poll', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(error);
        }

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

    const handleRemoveOption = (index: number) => {
        let current = {...formState};
        current.options.splice(index, 1);
        setFormState(current);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" name={"title"} placeholder={"Type your question here..."} onChange={handleInputChange}
                   value={formState.title}/>

            <fieldset>
                <legend>Answer Options</legend>
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
            </fieldset>

            <fieldset>
                <legend>Settings</legend>
                <label><input name={"private"} type={"checkbox"} checked={formState.private} onChange={handleInputChange} /> Private Poll</label>
                <label><input name={"multipleChoice"} type={"checkbox"} checked={formState.multipleChoice} onChange={handleInputChange} /> Allow Multiple Choice</label>
            </fieldset>

            <button disabled={!canSubmit} type={"submit"}>Save</button>
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
                    <Option
                        key={option.id}
                        option={option}
                        multipleChoice={poll.multipleChoice}
                    />
                )}
            </div>
        </div>
    );
}

export default Poll;