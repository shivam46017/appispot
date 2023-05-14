import React, { useState } from 'react'
import {toast} from 'react-toastify'

function AmenitiesManagement() {

    const [categories, setCategories] = useState([
        {id: 1, name: 'Barbeque', icon: "/Icons/CategoriesIcons/Barbeque.svg"},
        {id: 2, name: 'Picnic', icon: "/Icons/CategoriesIcons/PIcnic.svg"},
        {id: 3, name: 'Wedding', icon: "/Icons/CategoriesIcons/Wedding.svg"},
        {id: 4, name: 'Wedding Reception', icon: "/Icons/CategoriesIcons/wedding Reception.svg"},
        {id: 5, name: 'Party', icon: "/Icons/CategoriesIcons/Party.svg"},
        {id: 6, name: 'Graduation Party', icon: "/Icons/CategoriesIcons/Graduation Party.svg"},
        {id: 7, name: 'Baby Shower', icon: "/Icons/CategoriesIcons/Baby Shower.svg"},
        {id: 8, name: 'Birthday Party', icon: "/Icons/CategoriesIcons/Birthday party.svg"},
        {id: 9, name: 'Engagement Party', icon: "/Icons/CategoriesIcons/engagement Party.svg"},
        {id: 10, name: 'OutDoor Dinner', icon: "/Icons/CategoriesIcons/Outdoror Dinner.svg"},
        {id: 11, name: 'Bridal Shower', icon: "/Icons/CategoriesIcons/Bridal shower.svg"},
        {id: 12, name: 'Gyms', icon: "/Icons/CategoriesIcons/Gym.svg"},
        {id: 13, name: 'Gathering', icon: "/Icons/CategoriesIcons/Gathering.svg"},
        {id: 14, name: 'Fundraiser', icon: "/Icons/CategoriesIcons/Fundraiser.svg"},
        {id: 15, name: 'Wellness', icon: "/Icons/CategoriesIcons/Wllness.svg"},
        {id: 16, name: 'Video Shoot', icon: "/Icons/CategoriesIcons/Videoshoot.svg"},
        {id: 17, name: 'Pop-up shops', icon: "/Icons/CategoriesIcons/Shop.svg"},
        {id: 18, name: "Corporate Party", icon: "/Icons/CategoriesIcons/Cortorate party.svg"}
    ])
    const [amenities, setAmenities] = useState([
        {id: 1, name: 'Fire Pit', icon: "/Icons/AmminitiesIcons/Fire Pit.svg"},
        {id: 2, name: 'Deck', icon: "/Icons/AmminitiesIcons/Deck.svg"},
        {id: 3, name: 'Pool', icon: "/Icons/AmminitiesIcons/Pool.svg"},
        {id: 4, name: 'Gazeboo', icon: "/Icons/AmminitiesIcons/Gazebo.svg"},
        {id: 5, name: 'Grill', icon: "/Icons/AmminitiesIcons/Grill.svg"},
        {id: 6, name: 'Hot Tub', icon: "/Icons/AmminitiesIcons/Hot Tub.svg"},
        {id: 7, name: 'Restroom', icon: "/Icons/AmminitiesIcons/Restroom.svg"},
        {id: 8, name: 'Pet Friendly', icon: "/Icons/AmminitiesIcons/Pet Friendly.svg"},
        {id: 9, name: "Jacuzzi", icon: "/Icons/AmminitiesIcons/Jacuzee.svg"},
        {id: 10, name: "Noise Friendly", icon: "/Icons/AmminitiesIcons/Noice Friendly.svg"},
        {id: 11, name: 'Wifi', icon: "/Icons/AmminitiesIcons/Wifi.svg"},
        {id: 12, name: 'Chairs & Tables', icon: "/Icons/AmminitiesIcons/Table Chair.svg"},
        {id: 13, name: 'Parking', icon: "/Icons/AmminitiesIcons/Parking.svg"},
        {id: 14, name: 'Tables', icon: "/Icons/AmminitiesIcons/Table.svg"},
        {id: 15, name: 'Chairs', icon: "/Icons/AmminitiesIcons/Chair.svg"}
    ])

    const [showAddCategoryDialog, setshowAddCategoryDialog] = useState(false)
    const [showAddAmenityDialog, setshowAddAmenityDialog] = useState(false)

    const [newCategoryIcon, setnewCategoryIcon] = useState(null)
    const [newCategoryName, setnewCategoryName] = useState('')

    const [newAmenityIcon, setnewAmenityIcon] = useState(null)
    const [newAmenityName, setnewAmenityName] = useState('')

    // const [newAmenity, setnewAmenity] = useState(second)

    const handleCategoriesUpdation = () => {
        console.log('Categories Updated')
    }
    
    const handleAmenitiesUpdation = () => {
        console.log('Amenities Updated')
    }

    const handleAddCategoryClicked = () => {
        setshowAddCategoryDialog(true)
    }

    const handleAddAmenityClicked = () => {
        setshowAddAmenityDialog(true)
    }

    const handleAddAmenity = async (name, icon) => {
        const form = new FormData()
        form.append('amenityName', name)
        form.append('amenityIcon', icon)
        const response = await fetch('http://localhost:5000/api/update-amenities', {
            method: 'POST',
            body: form
        })
        const data = await response.json()
        if(data.status === 'success') {
            toast.success('Amenity Added Successfully')
            setshowAddAmenityDialog(false)
        } else {
            toast.error('Something went wrong')
        }
    }

    const handleAddCategory = async (name, icon) => {

        const form = new FormData()
        form.append('categoryName', name)
        form.append('categoryIcon', icon)
        const response = await fetch('http://localhost:5000/api/update-category', {
            method: 'POST',
            body: form
        })
        const data = await response.json()
        if(data.status === 'success') {
            toast.success('Category Added Successfully')
            setshowAddCategoryDialog(false)
        } else {
            toast.error('Something went wrong')
        }
    }

    const AddCategory = ({setCategories, categories, showAddCategoryDialog, setshowAddCategoryDialog}) => {
        const [newCategory, setnewCategory] = useState()
        const [newIcon, setnewIcon] = useState()
        
        return (
            <div className='fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex justify-center items-center'>
                <div className='bg-white w-1/3 h-1/2 rounded-lg flex flex-col p-5 shadow-xl relative'>
                <span className='absolute right-6 cursor-pointer' onClick={()=>{
                    setshowAddCategoryDialog(false)
                }}>
                    &#x2716;
                </span>
                    <h1 className='font-medium text-2xl'>Add a new Category</h1>
                    <span className='font-extralight mb-2'>Add a new Category to the list</span>
                    <form action="" id="form-c">
                    <div className='flex flex-col mt-5'>
                        <label className='font-light text-sm'>Category Name</label>
                        <input type="text" name="categoryName" className='border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2' onChange={(e)=>{
                                setnewCategory(e.target.value)
                            }
                            }/>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label className='font-light text-sm'>Category Icon</label>
                        <input type="file" name="categoryIcon" className='border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2' onChange={(e)=>{
                                setnewIcon(e.target.files[0])
                            }
                            }/>
                    </div>
                    </form>
                    <div className='flex justify-end mt-5'>
                        <button className='bg-blue-700 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3' onClick={()=>{
                            const newCategories = [...categories, {name: newCategory, icon: newIcon}]
                            setCategories(newCategories)
                            setshowAddCategoryDialog(false)
                            onclick(handleAddCategory(newCategory, newIcon))
                            toast.success("Category Added", {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                        }
                        }>
                            Add Category
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    
    const AddAmenity = ({setAmenities, amenities, showAddAmenityDialog, setshowAddAmenityDialog}) => {
        const [newAmenity, setnewAmenity] = useState()
        const [newIcon, setnewIcon] = useState()
    
        return (
            <div className='fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex justify-center items-center'>
                <div className='bg-white w-1/3 h-1/2 rounded-lg flex flex-col p-5 shadow-xl relative'>
                    <span className='absolute right-6 cursor-pointer' onClick={() => {
                        setshowAddAmenityDialog(false)
                    }}>
                        &#x2716;
                    </span>
                    <h1 className='font-medium text-2xl'>Add a new Amenity</h1>
                    <span className='font-extralight mb-2'>Add a new Amenity to the list</span>
                    <form action="" id='form-a'>
    
                    <div className='flex flex-col mt-5'>
                        <label className='font-light text-sm'>Amenity Name</label>
                        <input type="text" name='amenityName' className='border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2' onChange={(e)=>{
                                setnewAmenity(e.target.value)
                            }
                        }/>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label className='font-light text-sm'>Amenity Icon</label>
                        <input type="file" name='amenityIcon' className='border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2' onChange={(e)=>{
                                setnewIcon(e.target.files[0])
                            }
                            }/>
                    </div>
                    </form>
                    <div className='flex justify-end mt-5'>
                        <button className='bg-blue-700 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3' onClick={()=>{
                            const newAmenities = [...amenities, {name: newAmenity, icon: newIcon}]
                            setAmenities(newAmenities)
                            setshowAddAmenityDialog(false)
                            onclick(handleAddAmenity(newAmenity, newIcon))
                            toast.success("Amenity Added", {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }
                    }>
                            Add Amenity
                        </button>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div>
        {
            showAddCategoryDialog &&
            <AddCategory categories={categories} setCategories={setCategories} showAddCategoryDialog={showAddCategoryDialog} setshowAddCategoryDialog={setshowAddCategoryDialog} />
        }
        {
            showAddAmenityDialog &&
            <AddAmenity amenities={amenities} setAmenities={setAmenities} showAddAmenityDialog={showAddAmenityDialog} setshowAddAmenityDialog={setshowAddAmenityDialog} />
        }
        <div className="categories ml-5 flex flex-col mb-5 pl-2">
            <h1 className="font-medium text-3xl mt-3">Categories</h1>
            <span className='font-extralight mb-2'>Add/Remove the Categories visible to Listers</span>
            <div className="list grid-cols-5 grid gap-x-3">
            {
                categories.map((category, index) => {
                    return (
                        <div className='flex items-center mt-3' key={index}>
                            <img src={category.icon} className='mr-3' width={20} height={20} />
                            <span className='mr-2 grow'>{category.name}</span>
                            <span className='justify-self-end mr-3 cursor-pointer' onClick={()=>{
                                const confirm = window.confirm("Are you sure you want to delete this category?")
                                if(confirm){
                                    const newCategories = categories.filter(cat => cat.id !== category.id)
                                    setCategories(newCategories)
                                    toast.error("Category Delete", {
                                        position: "top-right",
                                        autoClose: 1500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                      });
                                } else {
                                    return
                                }
                            }}>&#x2715;</span>
                        </div>
                    )
                })
            }
            <span className='font-light self-center text-blue-800 cursor-pointer py-2 mt-3 px-4 border border-solid border-blue-800 rounded-lg text-sm' onClick={handleAddCategoryClicked}>
                Add a new Category
            </span>
            </div>
        <button className='bg-blue-700 mt-5 ml-4 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3 self-end mr-10' onClick={handleCategoriesUpdation}>
            Update the Categories
        </button>
        </div>
        <div className="amenities ml-5 flex flex-col mb-5 pl-2">
            <h1 className="font-medium text-3xl mt-5">Amenities</h1>
            <span className='font-extralight mb-2'>Add/Remove the Amenities visible to Listers</span>
            <div className="list grid-cols-5 grid">
            {
                amenities.map((amenity, index) => {
                    return (
                        <div className='flex items-center mt-3' key={index}>
                            <img src={amenity.icon} className='mr-2' width={20} height={20} />
                            <span className='mr-2'>{amenity.name}</span>
                            <span className='justify-self-end mr-3 cursor-pointer' onClick={()=>{
                                const confirm = window.confirm("Are you sure you want to delete this Amenity?")
                                if(confirm){
                                    const newAmenities = amenities.filter(amen => amen.id !== amenity.id)
                                    setAmenities(newAmenities)
                                    toast.error("Amenity Delete", {
                                        position: "top-right",
                                        autoClose: 1500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                      });
                                } else {
                                    return
                                }
                            }}>&#x2715;</span>
                        </div>
                    )
                })
            }
            <span className='font-light self-center text-blue-800 cursor-pointer py-2 mt-3 px-4 border border-solid border-blue-800 rounded-lg text-sm' onClick={handleAddAmenityClicked}>
                Add a new Amenity
            </span>
            </div>
        <button className='bg-blue-700 mt-5 ml-4 mb-7 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3 self-end mr-10' onClick={handleAmenitiesUpdation}>
            Update the Amenities
        </button>
        </div>
    </div>
  )
  

}

export default AmenitiesManagement