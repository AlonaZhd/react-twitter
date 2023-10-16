import "./index.css";

function Box({ children, className='', style={} }) {
    return (
        <div style={style} className={`box ${className}`}>
            {children}
        </div>
    );
}

export default Box;
