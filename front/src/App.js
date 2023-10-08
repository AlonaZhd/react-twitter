import React, { useEffect, useState } from "react";
import Page from "./component/page";
import Container from "./container/post-list";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function handleMove(e) {
        setPosition({ x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
        window.addEventListener("pointermove", handleMove);

        return () => {
            window.removeEventListener("pointermove", handleMove);
        };
    }, []);

    return (
        <Page>
            <Container>
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "pink",
                        borderRadius: "50%",
                        opacity: 0.6,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        pointerEvents: "none",
                        left: -20,
                        top: -20,
                        width: 40,
                        height: 40,
                    }}
                ></div>
            </Container>
        </Page>
    );
}

export default App;
