import React from "react";

export const RenderCards = ({ value = 0 }) => {
    const stringValue = String(value);
    const isIcon = React.isValidElement(value);

    const digits = isIcon ? [value] : (value === '.' ? [value] : stringValue.padStart(2, '0').split(''));

    return (
        <>
            {digits.map((digit, index) => (
                <article key={index} className="card col-auto d-flex justify-content-center align-items-center border border-white bg-black text-white w-auto h-auto p-2">
                        {isIcon ? (
                            digit
                        ) : (
                            <span className="card-text display-3">{digit}</span>
                        )}
                </article>
            ))}
        </>
    );
};

