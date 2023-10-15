import React, { useRef } from "react";
import Page from "./component/page";
import Column from "./component/column";
// import Container from "./container/post-list";

function App() {
    const firstCatRef = useRef(null);
    const secondCatRef = useRef(null);
    const thirdCatRef = useRef(null);
    const top = useRef(null);
    const scrollUpButton = useRef(null);

    function handScrollBy(ref) {
        console.log(ref);
        if (ref && ref.current) {
            const offsetTop = ref.current.offsetTop;
            window.scrollBy({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    }

    // функція для прокручування нагору
    function scrollToTop() {
        if (top && top.current) {
            const offsetTop = top.current.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    }

    return (
        <Page>
            <div
                ref={top}
                style={{
                    position: "fixed",
                    top: "0",
                }}
            ></div>
            <button
                style={{
                    width: "150px",
                    marginRight: "10px",
                }}
                onClick={() => handScrollBy(firstCatRef)}
                className="btn btn-outline-primary"
            >
                Tom
            </button>
            <button
                style={{
                    width: "150px",
                    marginRight: "10px",
                }}
                onClick={() => handScrollBy(secondCatRef)}
                className="btn btn-outline-success"
            >
                Maru
            </button>
            <button
                style={{
                    width: "150px",
                }}
                onClick={() => handScrollBy(thirdCatRef)}
                className="btn btn-outline-warning"
            >
                Jerry
            </button>
            <Column>
                <ul
                    style={{
                        display: "grid",
                        gap: "500px",
                        marginTop: "50px",
                        marginBottom: "500px",
                    }}
                >
                    <li>
                        <img
                            src="https://placekitten.com/500/300"
                            alt="Tom"
                            ref={firstCatRef}
                        ></img>
                    </li>
                    <li>
                        <img
                            src="https://placekitten.com/450/250"
                            alt="Maru"
                            ref={secondCatRef}
                        ></img>
                    </li>
                    <li>
                        <img
                            src="https://placekitten.com/300/300"
                            alt="Jerry"
                            ref={thirdCatRef}
                        ></img>
                    </li>
                </ul>
            </Column>
            <div
                ref={scrollUpButton}
                onClick={() => scrollToTop()}
                style={{
                    position: "fixed",
                    bottom: "20px" /* Розміщення знизу */,
                    right: "20px" /* Розміщення справа */,
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#80808066",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    fontWeight: "800",
                    cursor: "pointer",
                }}
            >
                {"\u2191"}
            </div>
        </Page>
    );
}

export default App;
