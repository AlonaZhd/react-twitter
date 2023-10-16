import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./index.css";

function Page({ children }) {
    const theme = useContext(ThemeContext)

    return (
        <div className={`page page--${theme.value}`}>{children}</div>
    );
}

export default Page;