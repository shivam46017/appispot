function ListSpot() {
    return <>
        <div className={"flex flex-col min-h-screen justify-center items-center mt-[3.5%] mb-[3.5%]"}>
            <div className={"text-4xl p-3 border-b-4 w-[90%] mb-[1.5%] text-center"}>LIST YOUR SPOT</div>
            <div className={"flex flex-col md:flex-row mt-4 md:mt-2 md:space-y-0 space-y-5 md:space-x-12"}>
                <div className={"flex flex-col space-y-5"}>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        your listing
                    </button>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        Bookings
                    </button>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        Calender
                    </button>
                </div>
                <div className={"md:hidden drop-shadow-md rounded-xl bg-white p-3 w-fit"}>
                    Enter details to add new spot:
                </div>
                <div className={"pt-0"}>
                    <form action="" className={"flex flex-col space-y-5 md:w-[80vh] border-0 w-[40vh]"}>
                        <div className={"flex flex-col space-y-5 bg-[#F3F4F6] p-4 md:p-8 drop-shadow-md rounded-xl border-0"}>
                            <input type="text" placeholder={"Name"} className={"drop-shadow-md rounded-xl border-0"}/>
                            <textarea placeholder={"Description"} className={"drop-shadow-md rounded-xl border-0"}/>
                            <input type="text" placeholder={"Spot Price /per hour"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <input type="text" placeholder={"When are you open"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <input type="text" placeholder={"Spot size Sq/Ft"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <input type="text" placeholder={"How many guests do you recommend"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <ul className={"flex flex-col space-y-4"}>
                                <span>What are the events your spot would be a great fit for:</span>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Birthday</li>
                                </div>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Baby Shower</li>
                                </div>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Bachelors Party</li>
                                </div>
                            </ul>
                            <ul className={"flex flex-col space-y-4"}>
                                <span>What do you provide:</span>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Catering</li>
                                </div>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Beers</li>
                                </div>
                                <div className={"flex flex-row space-x-2"}>
                                    <input type="checkbox"
                                           className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                                    <li>Dancers</li>
                                </div>
                                <span className={"ml-auto"}>*add more amenities for better reach</span>
                            </ul>
                            <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <div className={"flex flex-col space-y-2"}>
                                <label htmlFor="spot-type-select">Select Spot Type</label>
                                <select name="spot-type" id="spot-type-select"
                                        className={"drop-shadow-md rounded-xl border-0"}>
                                    <option value="">Please choose an option --</option>
                                    <option value="outdoor">outdoor</option>
                                    <option value="indoor">indoor</option>
                                </select>
                            </div>
                            <div className={"flex flex-col space-y-2"}>
                                <span>Upload images of the spot:</span>
                                <input type="file"
                                       id="file1"
                                       name="upload"
                                       className={"drop-shadow-md rounded-md border-none"}
                                />
                                <span className={"ml-auto text-red-400"}>*upto 15 images (1-mb max & jpg/png/jpeg)</span>
                            </div>
                            <input type="text" placeholder={"Spot rules"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                            <input type="text" placeholder={"Cancellation Policies"}
                                   className={"drop-shadow-md rounded-xl border-0"}/>
                        </div>
                        <div className={"flex flex-col md:flex-row space-y-2"}>
                            <input type="checkbox" name={"T&C"} className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                            <span>"By clicking this button, you agree to the terms and conditions of Appispot"</span>
                            <button
                                className={"ml-auto p-3 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>LIST
                                YOU SPOT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default ListSpot;