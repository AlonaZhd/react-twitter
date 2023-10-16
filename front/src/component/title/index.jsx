import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./index.css";

function Title({ children }) {
    const theme = useContext(ThemeContext)

    return (
        <div className="title__wrapp">
            <h1 className={`title title--${theme.value}`}>{children}</h1>
            <button
                onClick={theme.toggle}
                className={`field-form__button field-form__button--${theme.value}`}
            >
                {theme.value}
            </button>
        </div>
    );
}

export default Title;