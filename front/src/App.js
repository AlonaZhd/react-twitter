import React, { createContext, useEffect, useMemo, useState } from "react";
import Page from "./component/page";
import Container from "./container/post-list";

export const THEME_TYPE = {
    LIGHT: "light",
    DARK: "dark",
};

export const ThemeContext = createContext(null);

function App() {
    // const [position, setPosition] = useState({ x: 0, y: 0 });

    // function handleMove(e) {
    //     setPosition({ x: e.clientX, y: e.clientY });
    // }

    // useEffect(() => {
    //     window.addEventListener("pointermove", handleMove);

    //     return () => {
    //         window.removeEventListener("pointermove", handleMove);
    //     };
    // }, []);

    const [currentTheme, setTheme] = useState(THEME_TYPE.DARK);

    const handleChangeTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === THEME_TYPE.DARK) {
                return THEME_TYPE.LIGHT;
            } else {
                return THEME_TYPE.DARK;
            }
        });
    };

    const theme = useMemo(
        () => ({
            value: currentTheme,
            toggle: handleChangeTheme,
        }),
        [currentTheme]
    );

    return (
        <ThemeContext.Provider value={theme}>
            <Page>
                <Container>
                    {/* <div
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
                    ></div> */}
                </Container>
            </Page>
        </ThemeContext.Provider>
    );
}

export default App;
