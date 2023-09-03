import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Cards from "./Cards";
import Button from "@mui/material/Button";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import searchContext from '../../../context/search/searchContext'
// import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import List from "react-virtualized/dist/commonjs/List";

const sortOptions = [
  { name: "Name: A to Z", href: "#", current: true },
  { name: "Name: Z to A", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "spot-type",
    name: "Spot Type",
    options: [
      { value: "outdoor", label: "Outdoor", checked: false },
      { value: "indoor", label: "Indoor", checked: false },
    ],
  },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter() {

  const { query, addFilter, userWantToFilter, setUserWantToFilterOrNot } = useContext(searchContext)

  const [pseudoData, setpseudoData] = useState([]);
  const [backupData, setbackupData] = useState([]);

  const getAllSpots = async () => {
    const res = await axios.get(`http://localhost:5000/api/getallspots${query}`);
    const data = res.data.spots;
    setpseudoData(data);
  };

  useEffect(() => {
    getAllSpots();
  }, [query]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedSort, setSelectedSort] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(subCategories);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [selectedType, setSelectedType] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  function search() {
    if (searchTerm === "") {
      setpseudoData([...backupData]);
    } else {
      // let results = []
      // pseudoData.map((spot) => {
      //   if (spot.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   } else if (spot.Description.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   } else if (spot.Location.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   } else if (spot.Type.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   } else if (spot.Amenities.some((amenity) => amenity.amenityName.toLowerCase().includes(searchTerm.toLowerCase()))) {
      //     results.push(spot)
      //   } else if (spot.Categories.some((category) => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))) {
      //     results.push(spot)
      //   } else if (spot.Rules.some((rule) => rule.toLowerCase().includes(searchTerm.toLowerCase()))) {
      //     results.push(spot)
      //   } else if (spot.CancelPolicy.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   } else if (spot.Price.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      //     results.push(spot)
      //   }
      // })
      // console.log(results);
      // setpseudoData(results);

      // setting new pseudoData value based upon search term and only names that match not other properties
      setpseudoData([
        ...backupData.filter((spot) =>
          spot.Name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ]);
    }
  }

  function search2(items = pseudoData, searchTerm = searchTerm) {
    const filteredItems = items.filter((item) => {
      // Check if the search term matches any properties of the item
      for (const property in item) {
        if (
          typeof item[property] === "string" &&
          item[property].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        } else if (Array.isArray(item[property])) {
          const arrMatches = item[property].filter(
            (elem) =>
              typeof elem === "string" &&
              elem.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (arrMatches.length > 0) {
            return true;
          }
        }
      }
      return false;
    });

    return filteredItems;
  }

  function handleSortChange(sort) {
    setSelectedSort(sort);
    console.log("sort: ", sort);
    // selectedSort.name === "Price: Low to High" && console.log(selectedSort) && setpseudoData([[...pseudoData].sort((a, b) => a.Price - b.Price)])
    // selectedSort.name === "Price: High to Low" && console.log(selectedSort.name) && setpseudoData([[...pseudoData].sort((a, b) => b.Price - a.Price)])
    // selectedSort.name === "Name: A to Z" && console.log(selectedSort.name) && setpseudoData([[...pseudoData].sort((a, b) => a.Name.localeCompare(b.Name))])
    // selectedSort.name === "Name: Z to A" && console.log(selectedSort.name) && setpseudoData([[...pseudoData].sort((a, b) => b.Name.localeCompare(a.Name))])
    if (sort === "Price: Low to High") {
      console.log(selectedSort);
      let sorted = [...pseudoData].sort((a, b) => a.Price - b.Price);
      setpseudoData(sorted);
      console.log("sorted", sorted);
      console.log("pseudoData", pseudoData);
    } else if (sort === "Price: High to Low") {
      console.log(selectedSort);
      let sorted = [...pseudoData].sort((a, b) => b.Price - a.Price);
      setpseudoData(sorted);
      console.log("sorted", sorted);
      console.log("pseudoData", pseudoData);
    } else if (sort === "Name: A to Z") {
      console.log(selectedSort);
      let sorted = [...pseudoData].sort((a, b) => a.Name.localeCompare(b.Name));
      setpseudoData(sorted);
      console.log("sorted", sorted);
      console.log("pseudoData", pseudoData);
    } else if (sort === "Name: Z to A") {
      console.log(selectedSort);
      let sorted = [...pseudoData].sort((a, b) => b.Name.localeCompare(a.Name));
      setpseudoData(sorted);
      console.log("sorted", sorted);
      console.log("pseudoData", pseudoData);
    }
    console.log(pseudoData);
  }

  function handleFilterChange(params) {
    const { filterType, value, addRemove } = params;
    console.log("Filter changed", params);
    if (filterType === "category") {
      console.log("filterType: ", filterType);
      console.log(addRemove);
      if (addRemove === "add") {
        setSelectedCategories([...selectedCategories, value]);
        console.log("selectedCategories: ", selectedCategories);
        // let newData = pseudoData.filter((spot) => spot.Categories.includes(value))
        // spot.Categories format is an array of objects, each object has a categoryId, categoryName, and categoryIcon out of which we need to filter by categoryName
        let newData = [...pseudoData].filter((spot) =>
          spot.Categories.some((category) => category.categoryName === value)
        );
        setpseudoData(newData);
      } else {
        setSelectedCategories(
          selectedCategories.filter((category) => category !== value)
        );
        console.log("selectedCategories: ", selectedCategories);
        let newData = [...pseudoData].filter((spot) =>
          spot.Categories.some((category) => category.categoryName === value)
        );
        setpseudoData(newData);
      }
    } else if (filterType === "amenities") {
      console.log("filterType: ", filterType);
      console.log(addRemove);
      if (addRemove === "add") {
        setSelectedAmenities([...selectedAmenities, value]);
        console.log("selectedAmenities: ", selectedAmenities);
        // spot.Ameinities is also an array of objects, each object has an amenityId, amenityName, and amenityIcon out of which we need to filter by amenityName
        let newData = [...pseudoData].filter((spot) =>
          spot.Amenities.some((amenity) => amenity.amenityName === value)
        );
        setpseudoData(newData);
      } else {
        setSelectedAmenities(
          selectedAmenities.filter((amenity) => amenity !== value)
        );
        console.log("selectedAmenities: ", selectedAmenities);
        let newData = [...pseudoData].filter((spot) =>
          spot.Amenities.some((amenity) => amenity.amenityName === value)
        );
        setpseudoData(newData);
      }
    } else if (filterType === "type") {
      console.log("filterType: ", filterType);
      console.log(addRemove);
      if (addRemove === "add") {
        setSelectedType([...selectedType, value]);
        let newData = [...pseudoData].filter((spot) =>
          spot.Type.includes(value)
        );
        setpseudoData(newData);
      } else {
        setSelectedType(selectedType.filter((type) => type !== value));
        let newData = [...pseudoData].filter((spot) =>
          spot.Type.includes(value)
        );
        setpseudoData(newData);
      }
    }
  }

  useEffect(() => {
    addFilter({
      Type: selectedType
    })
  }, [selectedType])

  function handleFilterChange(params) {
    console.log(params);
    if (params.addRemove === "add") {
      if (params.filterType === "category") {
        console.log("selectedCategories: ", selectedCategories);
        setSelectedCategories([...selectedCategories, params.value]);
        let newPseudoData = [...pseudoData].filter((spot) => {
          console.log(spot);
          spot.Categories.some(
            (category) => category.categoryName === params.value
          );
        });
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      } else if (params.filterType === "amenities") {
        console.log("selectedAmenities: ", selectedAmenities);
        setSelectedAmenities([...selectedAmenities, params.value]);
        let newPseudoData = [...pseudoData].filter((spot) =>
          spot.Amenities.some((amenity) => amenity.amenityName === params.value)
        );
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      } else if (params.filterType === "type") {
        console.log("selectedType: ", selectedType);
        setSelectedType([...selectedType, params.value]);
        let newPseudoData = [...pseudoData].filter((spot) =>
          spot.Type.includes(params.value)
        );
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      }
    } else if (params.addRemove === "remove") {
      if (params.filterType === "category") {
        console.log("selectedCategories: ", selectedCategories);
        setSelectedCategories(
          selectedCategories.filter((category) => category !== params.value)
        );
        let newPseudoData = [...pseudoData].filter((spot) =>
          spot.Categories.some(
            (category) => category.categoryName === params.value
          )
        );
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      } else if (params.filterType === "amenities") {
        console.log("selectedAmenities: ", selectedAmenities);
        setSelectedAmenities(
          selectedAmenities.filter((amenity) => amenity !== params.value)
        );
        let newPseudoData = [...pseudoData].filter((spot) =>
          spot.Amenities.some((amenity) => amenity.amenityName === params.value)
        );
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      } else if (params.filterType === "type") {
        console.log("selectedType: ", selectedType);
        setSelectedType(selectedType.filter((type) => type !== params.value));
        let newPseudoData = [...pseudoData].filter((spot) =>
          spot.Type.includes(params.value)
        );
        setpseudoData(newPseudoData);
        console.log("newPseudoData: ", newPseudoData);
      }
    }
  }

  const [listSize, setListSize] = useState(3);

  const hideFilters = () => {
    document.getElementById("filterList").style.display = "none";
    setListSize(3);
  };
  const showFilters = () => {
    let element = document.getElementById("filterList");
    if (element.style.display === "none") {
      element.style.display = "";
      setListSize(5);
    } else {
      hideFilters();
    }
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      onChange={() => {
                                        handleFilterChange({
                                          filterType: section.id,
                                          value: option.value,
                                          addRemove: option.checked
                                            ? "remove"
                                            : "add",
                                        });
                                      }}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main className="mx-auto max-w-full px-1 sm:px-6 lg:w-screen lg:px-32">
          <div className="flex sm:flex-row flex-col sm:items-baseline justify-between border-b border-gray-400">
            <h1 className="hidden sm:block text-4xl font-bold tracking-tight text-gray-900 mr-24">
              <Button variant="outlined" onClick={showFilters}>
                Filters
              </Button>
            </h1>

            <div className="flex grow m-auto sm:ml-24 sm:mr-8 mb-4">
              <input
                type="text"
                className="sm:w-full border-gray-300 inline sm:block rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  search();
                }}
              />
              <button
                className="inline sm:inline-block ml-3 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={search}
              >
                Search
              </button>
            </div>
            <div className="flex items-center justify-between sm:justify-left ml-2 sm:ml-8">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group ml-[230px] sm:ml-0 inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              onClick={() => {
                                handleSortChange(option.name);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="ml-4 sm:ml-0 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <div className="flex mr-2 items-center">
                  <span className="inline-flex justify-center text-sm font-medium text-gray-700  hover:text-gray-900">
                    Filters
                  </span>
                  <MenuIcon
                    className="mr-1 ml-1 h-2 w-2 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />

                  {/* <FunnelIcon className="inline h-5 w-5" aria-hidden="true" /> */}
                </div>
              </button>
            </div>
          </div>

          <section
            aria-labelledby="products-heading"
            className="pt-6 pb-6 ml-0"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div
              className={`grid grid-cols-1 gap-x-0 sm:gap-x-4 gap-y-10 lg:grid-cols-${listSize}`}
            >
              {/* Filters */}
              <form
                className=" lg:block"
                id="filterList"
                style={{ display: "none" }}
              >
                {/* <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // handleFilterChange(section.id, option.value, 'add');
                                      handleFilterChange({
                                        filterType: section.id,
                                        value: option.value,
                                        addRemove: "add",
                                      });
                                      // setSelectedCategories([...selectedCategories, option.value])
                                      // addFilter(section.id, option.value);
                                    } else {
                                      // setSelectedCategories(selectedCategories.filter((item) => item !== option.value))
                                      // handleFilterChange(section.id, option.value, 'remove');
                                      handleFilterChange({
                                        filterType: section.id,
                                        value: option.value,
                                        addRemove: "remove",
                                      });
                                      // removeFilter(section.id, option.value);
                                    }
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}

                <ArrowBackIosNewRoundedIcon
                  style={{
                    fontSize: "2.5em",
                    marginLeft: "85%",
                    color: "#9e9fa1",
                    marginTop: "10%",
                  }}
                  onClick={hideFilters}
                />
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                {pseudoData.map((item, index) => {
                  console.log(item);
                  return (
                    <Cards
                      key={index}
                      objectId={item._id}
                      title={item.Name}
                      description={item.Description}
                      image={item.Images[0]}
                      rating={item.rating}
                      amenities={item.Amenities}
                      price={item.Price}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
