import React, { useState } from "react";
function HowToList() {
    const mainBoxStyles = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: "25px", marginTop: '80px', marginBottom: "150px" }


    const handleMouseEnter1 = async () => {
        const element1 = document.getElementById("boxOne");
        const element2 = document.getElementById("paragraphOne");
        if (element1) {
            element1.style.height = '260px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
              }, 100);
        }
    };
    const handleMouseLeave1 = () => {

        const element1 = document.getElementById("boxOne");
        const element2 = document.getElementById("paragraphOne");

        if (element1) {
            element1.style.height = '72px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter2 = async () => {
        const element1 = document.getElementById("boxTwo");
        const element2 = document.getElementById("paragraphTwo");
        if (element1) {
            element1.style.height = '260px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
              }, 100);
        }
    };
    const handleMouseLeave2 = () => {

        const element1 = document.getElementById("boxTwo");
        const element2 = document.getElementById("paragraphTwo");

        if (element1) {
            element1.style.height = '72px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter3 = async () => {
        const element1 = document.getElementById("boxThree");
        const element2 = document.getElementById("paragraphThree");
        if (element1) {
            element1.style.height = '260px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
              }, 100);
        }
    };
    const handleMouseLeave3= () => {

        const element1 = document.getElementById("boxThree");
        const element2 = document.getElementById("paragraphThree");

        if (element1) {
            element1.style.height = '72px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };


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
                                height: "72px",
                                fontSize: '1.25em',
                                borderRadius: '25px',
                                margin: '10px',
                                padding: '15px',
                                marginTop: '5px',
                                boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                                transition: "height 0.09s ease"
                            }}>
                            <p
                                style={{
                                    fontSize: '1.5em',
                                    fontWeight: 'bolder',
                                }}>List your Spot</p>
                            <div id="paragraphOne" style={{ display: 'none', marginTop: '10px',  }}>Make your pool, backyard, or venue spot more
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
                            height: "72px",
                            fontSize: '1.25em',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '15px',
                            marginTop: '5px',
                            boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                            transition: "height 0.09s ease"
                        }}>
                            <p style={{
                                fontSize: '1.5em',
                                fontWeight: 'bolder',
                            }} >Accept bookings</p>
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
                            height: "72px",
                            fontSize: '1.25em',
                            borderRadius: '25px',
                            margin: '10px',
                            padding: '15px',
                            marginTop: '5px',
                            boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)",
                            transition: "height 0.09s ease"
                        }}>
                            <p style={{
                                fontSize: '1.5em',
                                fontWeight: 'bolder',
                            }}>Get paid</p>
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