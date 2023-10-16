import { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import "./index.css";

function FieldForm({ placeholder, button, onSubmit }) {
    const [value, setValue] = useState("")

    const handleChange = (e) => setValue(e.target.value)

    const handleSubmit = () => {
        if(value.length === 0) return null

        if (onSubmit) {
            onSubmit(value)
        } else {
            throw new Error('onSubmit props is undefined')
        }

        setValue("")
    }

    const isDisabled = value.length === 0

    const theme = useContext(ThemeContext)

    return (
        <div className="field-form">
            <textarea 
            onChange={handleChange}
            value={value}
            rows={1}
            placeholder={placeholder}
            className={`field-form__field field-form__field--${theme.value}`}
            ></textarea>
            <button
                disabled={isDisabled}
                onClick={handleSubmit}
                className={`field-form__button field-form__button--${theme.value}`}
            >
                {button}
            </button>
        </div>
    );
}

export default FieldForm;