import React, { useState } from "react";
function HowToList() {
    const mainBoxStyles = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: "25px", marginTop: '120px', marginBottom: "250px" }


    const handleMouseEnter1 = async () => {
        const element1 = document.getElementById("boxOne");
        const element2 = document.getElementById("paragraphOne");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave1 = () => {

        const element1 = document.getElementById("boxOne");
        const element2 = document.getElementById("paragraphOne");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter2 = async () => {
        const element1 = document.getElementById("boxTwo");
        const element2 = document.getElementById("paragraphTwo");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave2 = () => {

        const element1 = document.getElementById("boxTwo");
        const element2 = document.getElementById("paragraphTwo");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter3 = async () => {
        const element1 = document.getElementById("boxThree");
        const element2 = document.getElementById("paragraphThree");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave3 = () => {

        const element1 = document.getElementById("boxThree");
        const element2 = document.getElementById("paragraphThree");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };
    const listIcon = ["/homePageIcons/howToList/Accept Booking.png", ""]
    const acceptIcon = ["/homePageIcons/howToList/Get Paid.png", ""]
    const paidIcon = ["/homePageIcons/howToList/list Your Spot.png", ""]


    return (
        <>
            <div style={mainBoxStyles}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span className="text-3xl md:text-[2.5rem] text-black text-left font-bold title-font my-12 mb-6" style={{ marginBottom: "80px" }} >
                        HOW TO LIST YOUR SPOT?
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '172px' }}>
                    <div
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                    >
                        <p
                            id="boxOne" style={{
                                width: "20vw",
                                height: '160px',
                                fontSize: '1.25em',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '15px',
                                marginTop: '5px',
                                boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                                transition: "height 0.05s ease"
                            }}>
                            <p
                                style={{
                                    fontSize: '1.5em',
                                    fontWeight: 'bolder',
                                }}>
                                <img src={listIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                List your Spot</p>
                            <div id="paragraphOne" style={{ display: 'none', marginTop: '10px', }}>Make your pool, backyard, or venue spot more
                                appealing by adding pictures, establishing
                                an hourly rate, and outlining detailed rules.</div>
                        </p>
                    </div>
                    <div
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                    >
                        <p id="boxTwo" style={{
                            width: "20vw",
                            height: '160px',
                            fontSize: '1.25em',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '15px',
                            marginTop: '5px',
                            boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                            transition: "height 0.05s ease"
                        }}>
                            <p style={{
                                fontSize: '1.5em',
                                fontWeight: 'bolder',
                            }} >
                                <img src={acceptIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                Accept bookings</p>
                            <div id="paragraphTwo" style={{ display: 'none', marginTop: '10px', }}>Customer booking requests will be
                                reviewed and approved at your discretion.</div>
                        </p>
                    </div>
                    <div
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                    >
                        <p id="boxThree" style={{
                            width: "20vw",
                            height: '160px',
                            fontSize: '1.25em',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '15px',
                            marginTop: '5px',
                            boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                            transition: "height 0.05s ease"
                        }}>
                            <p style={{
                                fontSize: '1.5em',
                                fontWeight: 'bolder',
                            }}>
                                <img src={paidIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                Get paid</p>
                            <div id="paragraphThree" style={{ display: 'none', marginTop: '10px', }}>
                                We guarantee secure payments made
                                directly to your bank account within 48 hours
                                of your reservation's completion.
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HowToList