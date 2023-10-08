import Column from "../column";

import "./index.css";

function PostContent({ username, date, text }) {
    // console.log(username, date, text)
    return (
        <Column>
            <div className="post-content">
                <span className="post-content__username">@{username}</span>
                <span className="post-content__date">{date}</span>
            </div>
    
            <p className="post-content__text">{text}</p>
        </Column>
    );
}

export default PostContent;