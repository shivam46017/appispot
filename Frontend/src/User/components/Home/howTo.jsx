import React, { useState } from "react";

function HowTo() {
    const mainBoxStyles = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: "25px", marginTop: '80px', marginBottom: "150px" }

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <div style={mainBoxStyles}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span className="text-3xl md:text-[2.5rem] text-black text-left font-bold title-font my-12 mb-6" style={{ marginBottom: "80px" }} >
                    HOW TO LIST YOUR SPOT?
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '172px' }}>
                <div>
                    <p style={{
                        width: "20vw",
                        height: "260px",
                        fontSize: '1.25em',
                        borderRadius: '25px',
                        margin: '10px',
                        padding: '15px',
                        marginTop: '5px',
                        boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                    }}>
                        <p style={{
                            fontSize: '1.5em',
                            fontWeight: 'bolder',
                        }}>List your Spot</p>
                        <div style={{ marginTop: '10px' }}>Make your pool, backyard, or venue spot more
                            appealing by adding pictures, establishing
                            an hourly rate, and outlining detailed rules.</div>
                    </p>
                </div>
                <div>
                    <p style={{
                        width: "20vw",
                        height: "260px",
                        fontSize: '1.25em',
                        borderRadius: '25px',
                        margin: '10px',
                        padding: '15px',
                        marginTop: '5px',
                        boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                    }}>
                        <p style={{
                            fontSize: '1.5em',
                            fontWeight: 'bolder',
                        }} >Accept bookings</p>
                        <div style={{ marginTop: '10px' }}>Customer booking requests will be
                            reviewed and approved at your discretion.</div>
                    </p>
                </div>
                <div>
                    <p style={{
                        width: "20vw",
                        height: "260px",
                        fontSize: '1.25em',
                        borderRadius: '25px',
                        margin: '10px',
                        padding: '15px',
                        marginTop: '5px',
                        boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                    }}>
                        <p style={{
                            fontSize: '1.5em',
                            fontWeight: 'bolder',
                        }}>Get paid</p>
                        <div style={{ marginTop: '10px' }}>
                            We guarantee secure payments made
                            directly to your bank account within 48 hours
                            of your reservation's completion.
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default HowTo