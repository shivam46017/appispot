import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

function AmenitiesManagement() {
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [showAddCategoryDialog, setshowAddCategoryDialog] = useState(false);
  const [showAddAmenityDialog, setshowAddAmenityDialog] = useState(false);

  const handleCategoriesUpdation = () => {
    console.log("Categories Updated");
  };

  const handleAmenitiesUpdation = () => {
    console.log("Amenities Updated");
  };

  const handleAddCategoryClicked = () => {
    setshowAddCategoryDialog(true);
  };

  const handleAddAmenityClicked = () => {
    setshowAddAmenityDialog(true);
  };


  const fetchAmenities = async () => {
    const res = await axios.get(`https://many-aerial-innovation-programming.trycloudflare.com/api/getAmenities`);
    const resData = res.data;
    if (resData.success === true) {
      setAmenities(resData.amenities);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleAddAmenity = useCallback(async (name, icon) => {
    console.log(name, icon);
    const form = new FormData();
    form.append("amenityName", name);
    form.append("amenityIcon", icon);
    const res = await axios.post(
      `https://many-aerial-innovation-programming.trycloudflare.com/api/update-amenities`,
      form
    );
    const resData = res.data;
    if (resData.success === true) {
      await fetchAmenities();
      toast.success("Amenity Added Successfully");
      setshowAddAmenityDialog(false);
    } else {
      toast.error("Something went wrong");
    }
  }, []);

  const handleAddCategory = useCallback(async (name, icon) => {
    const form = new FormData();
    form.append("categoryName", name);
    form.append("categoryIcon", icon);
    const res = await axios.post(
      `https://many-aerial-innovation-programming.trycloudflare.com/api/update-category`,
      form
    );
    const resData = res.data;
    if (resData.success === true) {
      await fetchCategories();
      toast.success("Category Added Successfully");
      setshowAddCategoryDialog(false);
    } else {
      toast.error("Something went wrong");
    }
  }, []);

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `https://many-aerial-innovation-programming.trycloudflare.com/api/delete-category/${id}`
      );
      const resData = res.data;
      if (resData.success === true) {
        toast.success("Category Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error");
      toast.error("Something went wrong");
    }
  };

  const deleteAmenity = async (id) => {
    try {
      const res = await axios.delete(
        `https://many-aerial-innovation-programming.trycloudflare.com/api/delete-amenities/${id}`
      );
      const resData = res.data;
      if (resData.success === true) {
        toast.success("Amenity Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error");
      toast.error("Something went wrong");
    }
  };
  const AddCategory = ({
    setCategories,
    categories,
    showAddCategoryDialog,
    setshowAddCategoryDialog,
  }) => {
    const [newCategory, setnewCategory] = useState();
    const [newIcon, setnewIcon] = useState();

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white w-1/3 h-1/2 rounded-lg flex flex-col p-5 shadow-xl relative">
          <span
            className="absolute right-6 cursor-pointer"
            onClick={() => {
              setshowAddCategoryDialog(false);
            }}
          >
            &#x2716;
          </span>
          <h1 className="font-medium text-2xl">Add a new Category</h1>
          <span className="font-extralight mb-2">
            Add a new Category to the list
          </span>
          <form action="" id="form-c">
            <div className="flex flex-col mt-5">
              <label className="font-light text-sm">Category Name</label>
              <input
                type="text"
                name="categoryName"
                className="border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2"
                onChange={(e) => {
                  setnewCategory(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-light text-sm">Category Icon</label>
              <input
                name="categoryIcon"
                type="file"
                className="border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2"
                onChange={(e) => {
                  setnewIcon(e.target.files[0]);
                }}
              />
            </div>
          </form>
          <div className="flex justify-end mt-5">
            <button
              className="bg-blue-700 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3"
              onClick={async () => {
                const newCategories = [
                  ...categories,
                  {
                    categoryName: newCategory,
                    categoryIcon: `http://locahost:5000/uploads/Amenities_categories/${newIcon.name}`,
                  },
                ];
                setCategories(newCategories);
                setshowAddCategoryDialog(false);
                await handleAddCategory(newCategory, newIcon);
              }}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddAmenity = ({
    setAmenities,
    amenities,
    showAddAmenityDialog,
    setshowAddAmenityDialog,
  }) => {
    const [newAmenity, setnewAmenity] = useState();
    const [newIcon, setnewIcon] = useState();

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white w-1/3 h-1/2 rounded-lg flex flex-col p-5 shadow-xl relative">
          <span
            className="absolute right-6 cursor-pointer"
            onClick={() => {
              setshowAddAmenityDialog(false);
            }}
          >
            &#x2716;
          </span>
          <h1 className="font-medium text-2xl">Add a new Amenity</h1>
          <span className="font-extralight mb-2">
            Add a new Amenity to the list
          </span>
          <form action="" id="form-a">
            <div className="flex flex-col mt-5">
              <label className="font-light text-sm">Amenity Name</label>
              <input
                type="text"
                name="amenityName"
                accept="image/*"
                className="border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2"
                onChange={(e) => {
                  setnewAmenity(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="font-light text-sm">Amenity Icon</label>
              <input
                type="file"
                name="amenityIcon"
                className="border border-solid border-gray-300 rounded-lg px-3 py-2 mt-2"
                onChange={(e) => {
                  setnewIcon(e.target.files[0]);
                }}
              />
            </div>
          </form>
          <div className="flex justify-end mt-5">
            <button
              className="bg-blue-700 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3"
              onClick={async () => {
                const newAmenities = [
                  ...amenities,
                  { name: newAmenity, icon: newIcon },
                ];
                setAmenities(newAmenities);
                setshowAddAmenityDialog(false);
                await handleAddAmenity(newAmenity, newIcon);
              }}
            >
              Add Amenity
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    Promise.all([fetchCategories(), fetchAmenities()]);
  }, []);

  return (
    <div>
      {showAddCategoryDialog && (
        <AddCategory
          categories={categories}
          setCategories={setCategories}
          showAddCategoryDialog={showAddCategoryDialog}
          setshowAddCategoryDialog={setshowAddCategoryDialog}
        />
      )}
      {showAddAmenityDialog && (
        <AddAmenity
          amenities={amenities}
          setAmenities={setAmenities}
          showAddAmenityDialog={showAddAmenityDialog}
          setshowAddAmenityDialog={setshowAddAmenityDialog}
        />
      )}
      <div className="categories ml-5 flex flex-col mb-5 pl-2">
        <h1 className="font-medium text-3xl mt-3">Categories</h1>
        <span className="font-extralight mb-2">
          Add/Remove the Categories visible to Listers
        </span>
        <div className="list grid-cols-5 grid gap-x-3">
          {categories &&
            categories.map((category, index) => {
              return (
                <div className="flex items-center mt-3" key={category._id}>
                  <img
                    src={`https://many-aerial-innovation-programming.trycloudflare.com${category.categoryIcon}`}
                    className="mr-3"
                    width={20}
                    height={20}
                  />
                  <span className="mr-2 grow">{category.categoryName}</span>
                  <span
                    className="justify-self-end mr-3 cursor-pointer"
                    onClick={async () => {
                      const confirm = window.confirm(
                        "Are you sure you want to delete this category?"
                      );
                      if (confirm) {
                        const newCategories = categories.filter(
                          (cat) => cat._id !== category._id
                        );
                        await deleteCategory(category._id);
                        setCategories(newCategories);
                      } else {
                        return;
                      }
                    }}
                  >
                    &#x2715;
                  </span>
                </div>
              );
            })}
          <span
            className="font-light self-center text-blue-800 cursor-pointer py-2 mt-3 px-4 border border-solid border-blue-800 rounded-lg text-sm"
            onClick={handleAddCategoryClicked}
          >
            Add a new Category
          </span>
        </div>
        <button
          className="bg-blue-700 mt-5 ml-4 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3 self-end mr-10"
          onClick={handleCategoriesUpdation}
        >
          Update the Categories
        </button>
      </div>
      <div className="amenities ml-5 flex flex-col mb-5 pl-2">
        <h1 className="font-medium text-3xl mt-5">Amenities</h1>
        <span className="font-extralight mb-2">
          Add/Remove the Amenities visible to Listers
        </span>
        <div className="list grid-cols-5 grid">
          {amenities &&
            amenities.map((amenity, index) => {
              return (
                <div className="flex items-center mt-3" key={amenity._id}>
                  <img
                    src={`https://many-aerial-innovation-programming.trycloudflare.com${amenity.amenityIcon}`}
                    className="mr-2"
                    width={20}
                    height={20}
                  />
                  <span className="mr-2">{amenity.amenityName}</span>
                  <span
                    className="justify-self-end mr-3 cursor-pointer"
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure you want to delete this Amenity?"
                      );
                      if (confirm) {
                        const newAmenities = amenities.filter(
                          (amen) => amen._id !== amenity._id
                        );
                        setAmenities(newAmenities);
                        deleteAmenity(amenity._id);
                      } else {
                        return;
                      }
                    }}
                  >
                    &#x2715;
                  </span>
                </div>
              );
            })}
          <span
            className="font-light self-center text-blue-800 cursor-pointer py-2 mt-3 px-4 border border-solid border-blue-800 rounded-lg text-sm"
            onClick={handleAddAmenityClicked}
          >
            Add a new Amenity
          </span>
        </div>
        <button
          className="bg-blue-700 mt-5 ml-4 mb-7 border-none outline-none text-sm text-white font-semibold rounded-lg px-5 py-3 self-end mr-10"
          onClick={handleAmenitiesUpdation}
        >
          Update the Amenities
        </button>
      </div>
    </div>
  );
}

export default AmenitiesManagement;
