import React from "react";

const Background = ({ children }) => {
    return (
        <div className="page-background">
            <img src="/train.png" className="train-image" />
            {children}
        </div>
    );
};

export default Background;