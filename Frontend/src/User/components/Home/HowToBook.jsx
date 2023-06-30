import React, { useState } from "react";
function HowToBook() {
    const mainBoxStyles = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: "25px", marginTop: '80px', marginBottom: "150px" }


    const handleMouseEnter4 = async () => {
        const element1 = document.getElementById("boxFour");
        const element2 = document.getElementById("paragraphFour");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave4 = () => {

        const element1 = document.getElementById("boxFour");
        const element2 = document.getElementById("paragraphFour");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter5 = async () => {
        const element1 = document.getElementById("boxFive");
        const element2 = document.getElementById("paragraphFive");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave5 = () => {

        const element1 = document.getElementById("boxFive");
        const element2 = document.getElementById("paragraphFive");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };

    const handleMouseEnter6 = async () => {
        const element1 = document.getElementById("boxSix");
        const element2 = document.getElementById("paragraphSix");
        if (element1) {
            element1.style.height = '352px';
        }
        if (element2) {
            setTimeout(() => {
                element2.style.display = 'block';
            }, 40);
        }
    };
    const handleMouseLeave6 = () => {

        const element1 = document.getElementById("boxSix");
        const element2 = document.getElementById("paragraphSix");

        if (element1) {
            element1.style.height = '160px';
        }

        if (element2) {
            element2.style.display = 'none';
        }
    };
    const exploreIcon = ["/homePageIcons/howToBook/Explore Our Spot.png", ""]
    const bookIcon = ["/homePageIcons/howToBook/Book your spot.png", ""]
    const confirmIcon = ["/homePageIcons/howToBook/Confirmation.png", ""]


    return (
        <>
            <div style={mainBoxStyles}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span className="text-3xl md:text-[2.5rem] text-black text-left font-bold title-font my-12 mb-6" style={{ marginBottom: "80px" }} >
                        HOW TO BOOK A SPOT?
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '172px' }}>
                    <div
                        onMouseEnter={handleMouseEnter4}
                        onMouseLeave={handleMouseLeave4}
                    >
                        <p
                            id="boxFour" style={{
                                width: "20vw",
                                height: "160px",
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
                                <img src={exploreIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                Explore our Spot
                            </p>
                            <div id="paragraphFour" style={{ display: 'none', marginTop: '10px', }}>
                                Explore nearby pools, backyards, and banquet halls,
                                check amenities and size, and read reviews to find the
                                perfect location for your next event.
                            </div>
                        </p>
                    </div>
                    <div
                        onMouseEnter={handleMouseEnter5}
                        onMouseLeave={handleMouseLeave5}
                    >
                        <p id="boxFive" style={{
                            width: "20vw",
                            height: "160px",
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
                                <img src={bookIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                Book your spot
                            </p>
                            <div id="paragraphFive" style={{ display: 'none', marginTop: '10px', }}>
                                Once your request is approved by the host, you're all set.
                            </div>
                        </p>
                    </div>
                    <div
                        onMouseEnter={handleMouseEnter6}
                        onMouseLeave={handleMouseLeave6}
                    >
                        <p id="boxSix" style={{
                            width: "20vw",
                            height: "160px",
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
                                <img src={confirmIcon[0]} alt=""
                                    style={{
                                        margin: 'auto',
                                        marginBottom: '3px',
                                        height: '85px',
                                        width: '85px'
                                    }} />
                                Confirmation</p>
                            <div id="paragraphSix" style={{ display: 'none', marginTop: '10px', }}>
                                After booking, you'll receive the address, entry/exit instructions, Wi-Fi login, and other details for a smooth stay.
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HowToBook