import React, { useRef } from 'react'

import '../../Styles/App.css'


interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

//export const InputField = ({ todo, setTodo }: Props) => {
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className='input' onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
        }}>
            <input
                ref={inputRef}
                type="input"
                className='input__box'
                placeholder='Enter your task'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button className='input__submit' type='submit' >Go</button>
        </form>
    )
}
export default InputField;