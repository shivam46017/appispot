import React, {useState} from 'react';

function ListSpot() {

    //logic to limit user from uploading more than 15 images and files larger than 2 mb

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    const MAX_NUM_FILES = 15;

    //to store the files
    const [files, setFiles] = useState([]);

    //to handle the file change
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);

        // Limit number of files
        if (fileList.length > MAX_NUM_FILES) {
            alert(`You can only upload up to ${MAX_NUM_FILES} files`);
            return;
        }

        // Limit file size
        const invalidFiles = fileList.filter((file) => file.size > MAX_FILE_SIZE);
        if (invalidFiles.length > 0) {
            const invalidFileNames = invalidFiles.map((file) => file.name).join(', ');
            alert(`The following files exceed the maximum size of 2MB: ${invalidFileNames}`);
            return;
        }

        // Update the state
        setFiles(fileList);
    };


    //lofic to handle the categories dynamically
    const [list1, setList1] = useState([
        {id: 1, label: 'Birthday', isChecked: false},
        {id: 2, label: 'Baby Shower', isChecked: false},
        {id: 3, label: "Bachelor's Party", isChecked: false},
    ]);

    //to handle the amenities dynamically
    const [list2, setList2] = useState([
        {id: 1, label: 'Catering', isChecked: false},
        {id: 2, label: 'Mini Bar', isChecked: false},
        {id: 3, label: 'Dancers', isChecked: false},
    ]);

    //to handle the checkbox change
    const handleCheckboxChange = (event, listSetter) => {
        // Get the id of the checkbox
        const id = parseInt(event.target.value);
        const updatedList = listSetter((list) =>
            list.map((item) => {
                if (item.id === id) {
                    return {...item, isChecked: event.target.checked};
                } else {
                    return item;
                }
            })
        );

        // Update the state
        listSetter(updatedList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form
        const checkedList1 = list1.filter((item) => item.isChecked);
        const checkedList2 = list2.filter((item) => item.isChecked);

        // Check if at least one checkbox is checked
        if (checkedList1.length === 0) {
            alert('Please select at least one checkbox in List 1');
            return;
        }

        // Check if at least one checkbox is checked
        if (checkedList2.length === 0) {
            alert('Please select at least one checkbox in List 2');
            return;
        }

        // Submit the form
        console.log('Form submitted');
    };

    return <>
        <div className={"flex flex-col min-h-screen justify-center items-center mt-[3.5%] mb-[3.5%]"}>
            <div className={"text-4xl p-3 border-b-4 w-[90%] mb-[1.5%] text-center"}>LIST YOUR SPOT</div>
            <div className={"flex flex-col md:flex-row mt-4 md:mt-2 md:space-y-0 space-y-5 lg:space-x-12 md:space-x-8"}>
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
                    <form action="" className={"flex flex-col space-y-5 md:w-[50vh] lg:w-[80vh] border-0 w-[40vh]"}
                          onSubmit={handleSubmit}>
                        <div
                            className={"flex flex-col space-y-5 bg-[#F3F4F6] p-4 md:p-8 drop-shadow-md rounded-xl border-0"}>
                            <input type="text" placeholder={"Name"} className={"drop-shadow-md rounded-xl border-0"}
                                   required/>
                            <textarea placeholder={"Description"} className={"drop-shadow-md rounded-xl border-0"}
                                      required/>
                            <input type="text" placeholder={"Spot Price /per hour"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                            <input type="text" placeholder={"When are you open"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                            <input type="text" placeholder={"Spot size Sq/Ft"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                            <input type="text" placeholder={"How many guests do you recommend"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                            <ul className={"flex flex-col space-y-4"}>
                                <span>What are the events your spot would be a great fit for:</span>
                                {list1.map((item) => (
                                    <li key={item.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                checked={item.isChecked}
                                                className={"mr-2 p-2 drop-shadow-md rounded-md"}
                                                onChange={(event) => handleCheckboxChange(event, setList1)}
                                            />
                                            {item.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <ul className={"flex flex-col space-y-4"}>
                                <span>What do you provide:</span>
                                {list2.map((item) => (
                                    <li key={item.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                checked={item.isChecked}
                                                className={"mr-2 p-2 drop-shadow-md rounded-md"}
                                                onChange={(event) => handleCheckboxChange(event, setList2)}
                                            />
                                            {item.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
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
                                <div className={"flex flex-row justify-between text-base"}>
                                    <input type="file"
                                           id="file"
                                           name="upload"
                                           accept=".png,.jpg,.jpeg"
                                           multiple onChange={handleFileChange}
                                           onDrag={handleFileChange} onDragOver={handleFileChange}
                                           className={"drop-shadow-md rounded-md border-none"}
                                    />
                                    🤚Or you can drag your file here!
                                </div>
                                <span
                                    className={"text-red-400 text-left"}>*upto 15 images (2-mb max & jpg/png/jpeg)</span>
                            </div>
                            <input type="text" placeholder={"Spot rules"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                            <input type="text" placeholder={"Cancellation Policies"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/>
                        </div>
                        <div className={"flex flex-col md:flex-row space-y-2 md:space-y-0"}>
                            <input type="checkbox" name={"T&C"} className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                            <span className={"text-sm"}>"By clicking this button, you agree to the terms and conditions of Appispot"</span>
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