import { useContext } from "react";
import Column from "../column";
import { ThemeContext } from "../../App";
import "./index.css";

function PostContent({ username, date, text }) {
    // console.log(username, date, text)
    const theme = useContext(ThemeContext)

    return (
        <Column>
            <div className="post-content">
                <span className={`post-content__username post-content__username--${theme.value}`}>@{username}</span>
                <span className="post-content__date">{date}</span>
            </div>
    
            <p className={`post-content__text post-content__text--${theme.value}`}>{text}</p>
        </Column>
    );
}

export default PostContent;