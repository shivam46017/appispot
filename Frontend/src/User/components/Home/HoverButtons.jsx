import React, { useState } from "react";

function HoverButtons() {
    const InsuranceIcon = ["/homePageIcons/Insurance Blue.png", "/homePageIcons/Insurance.png"];
    const customerServiceIcon = ["/homePageIcons/Customer service Blue.png", "/homePageIcons/Customer service.png"];
    const bookingIcon = ["/homePageIcons/booking Blue.png", "/homePageIcons/booking.png"];
    const confidenceIcon = ["/homePageIcons/confidance booking Blue.png", "/homePageIcons/confidance booking.png"];

    const [isHovered1, setIsHovered1] = useState(0);
    const [isHovered2, setIsHovered2] = useState(0);
    const [isHovered3, setIsHovered3] = useState(0);
    const [isHovered4, setIsHovered4] = useState(0);

    const handleMouseEnter1 = () => {
        setIsHovered1(1);
    };
    const handleMouseLeave1 = () => {
        setIsHovered1(0);
    };
    const handleMouseEnter2 = () => {
        setIsHovered2(1);
    };
    const handleMouseLeave2 = () => {
        setIsHovered2(0);
    };
    const handleMouseEnter3 = () => {
        setIsHovered3(1);
    };
    const handleMouseLeave3 = () => {
        setIsHovered3(0);
    };
    const handleMouseEnter4 = () => {
        setIsHovered4(1);
    };
    const handleMouseLeave4 = () => {
        setIsHovered4(0);
    };


    return (
        <div style={{ position: "relative" }}>
            <section className="relative flex flex-col bg-f1f1f1 py-[80px] text-center" id="hoveringButtons"
                // style={{
                //     position: 'relative',
                //     display: 'flex',
                //     flexDirection: 'column',
                // }}
                >
                <div
                className="flex flex-col sm:flex-row justify-around relative z-1 h-[600px] items-center sm:items-end" 
                // style={{
                //     display: "flex",
                //     justifyContent: 'space-around',
                //     position: "relative",
                //     zIndex: 1,
                //     height: '600px',
                //     alignItems: 'flex-end'
                // }} 
                >
                    <div className="hidden sm:block"
                    style={{
                        position: 'absolute',
                        top: '-11%',
                        width: '102%',
                        height: '600px',
                        zIndex: 2,
                        borderRadius: '25px',
                        backgroundImage: "url('/Blured 02.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                    }}
                    ></div>
                    <div
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                        className={isHovered1 ? 'hovered' : ''}>
                        <div className="loan-box" >
                            <img src={InsuranceIcon[isHovered1]} alt="" style={{
                                display: 'flex',
                                height: '70px',
                                width: '70px',
                                margin: 'auto',
                            }} />
                            <h3>Liability Insurance</h3>
                        </div>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        className={isHovered2 ? 'hovered' : ''}>
                        <div className="loan-box" >
                            <img src={customerServiceIcon[isHovered2]} alt="" style={{
                                display: 'flex',
                                height: '70px',
                                width: '70px',
                                margin: 'auto',
                            }} />
                            <h3>Exceptional Customer Service</h3>
                        </div>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                        className={isHovered3 ? 'hovered' : ''}>
                        <div className="loan-box" >
                            <img src={bookingIcon[isHovered3]} alt="" style={{
                                display: 'flex',
                                height: '70px',
                                width: '70px',
                                margin: 'auto',
                            }} />
                            <h3>Easy Booking Process </h3>
                        </div>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter4}
                        onMouseLeave={handleMouseLeave4}
                        className={isHovered4 ? 'hovered' : ''}>
                        <div className="loan-box" >
                            <img src={confidenceIcon[isHovered4]} alt="" on style={{
                                display: 'flex',
                                height: '70px',
                                width: '70px',
                                margin: 'auto',
                            }} />
                            <h3 >Book with confidence </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default HoverButtons