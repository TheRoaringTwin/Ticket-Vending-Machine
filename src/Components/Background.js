import React from "react";

const Background = ({ children }) => {
    return (
        <div className="page-background">
            <img src="/metro.avif" className="train-image" />
            {children}
        </div>
    );
};

export default Background;