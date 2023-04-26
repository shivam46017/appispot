import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageViewer from "./ImageViewer";
import ReactImageZoom from 'react-image-zoom';

const product = {
    name: "Alpha Party Hall",
    price: "$50/hour",
    href: "#",
    breadcrumbs: [
        { id: 1, name: "Men", href: "#" },
        { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
        {
            src: "https://th.bing.com/th/id/OIP.utfzQU9LITiZuyPkVHIjqgHaE8?pid=ImgDet&rs=1",
            alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
            src: "https://www.bookeventz.com/blog/wp-content/uploads/2016/08/720x480xhacienda_bella_terra12.jpg.pagespeed.ic.B3pQjLitnQ.jpg",
            alt: "Model wearing plain black basic tee.",
        },
        {
            src: "https://img.tagvenue.com/resize/61/d7/widen-1680-noupsize;7385-entire-venue-room.jpeg",
            alt: "Model wearing plain gray basic tee.",
        },
        {
            src: "https://th.bing.com/th/id/OIP.w0m7r7mj_dallyp0sFPF0gHaE8?pid=ImgDet&w=1024&h=684&rs=1",
            alt: "Model wearing plain white basic tee.",
        },
    ],
    colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
    ],
    description:
        'Whether you\'re planning a grand celebration or an intimate gathering, our venue can accommodate weddings of all sizes. From the moment you step inside, you\'ll be swept away by the beauty and charm of our space, which is designed to make your special day unforgettable.\n' +
        '\n',
    description2:
        'Venue cancellation policies can vary depending on the venue and the terms of the rental agreement. In general, most venues will require a certain amount of notice prior to cancellation in order to receive a refund or avoid additional fees. This notice period may range from a few weeks to several months, depending on the size and complexity of the event. Additionally, some venues may require a non-refundable deposit to hold the date, and this deposit may be forfeited in the event of a cancellation. It',
    amenities: [
        { id: 1, label: 'Fire Pit', isChecked: false, icon: "/Icons/AmminitiesIcons/Fire Pit.svg" },
        { id: 2, label: 'Deck', isChecked: false, icon: "/Icons/AmminitiesIcons/Deck.svg" },
        { id: 3, label: 'Pool', isChecked: false, icon: "/Icons/AmminitiesIcons/Pool.svg" },
        { id: 4, label: 'Gazeboo', isChecked: false, icon: "/Icons/AmminitiesIcons/Gazebo.svg" },
        { id: 5, label: 'Grill', isChecked: false, icon: "/Icons/AmminitiesIcons/Grill.svg" },
        { id: 6, label: 'Hot Tub', isChecked: false, icon: "/Icons/AmminitiesIcons/Hot Tub.svg" },
        { id: 7, label: 'Restroom', isChecked: false, icon: "/Icons/AmminitiesIcons/Restroom.svg" },
        { id: 8, label: 'Pet Friendly', isChecked: false, icon: "/Icons/AmminitiesIcons/Pet Friendly.svg" },
        { id: 9, label: "Jacuzzi", isChecked: false, icon: "/Icons/AmminitiesIcons/Jacuzee.svg" },
    ],
    timing: [
        { id: 1, label: 'Monday: 9AM - 9PM' },
        { id: 2, label: 'Tuesday: 9AM - 9PM' },
        { id: 3, label: 'Wednesday: 9AM - 9PM' },
        { id: 4, label: 'Thursday: 9AM - 9PM' },
        { id: 5, label: 'Friday: 9AM - 9PM' },
        { id: 6, label: 'Saturday: 9AM - 9PM' },
        { id: 7, label: 'Sunday: 9AM - 9PM' }
    ],
    categories: [
        { id: 1, label: 'Barbeque', isChecked: false, icon: "/Icons/CategoriesIcons/Barbeque.svg" },
        { id: 2, label: 'Picnic', isChecked: false, icon: "/Icons/CategoriesIcons/PIcnic.svg" },
        { id: 3, label: 'Wedding', isChecked: false, icon: "/Icons/CategoriesIcons/Wedding.svg" },
        { id: 4, label: 'Wedding Reception', isChecked: false, icon: "/Icons/CategoriesIcons/wedding Reception.svg" },
        { id: 5, label: 'Party', isChecked: false, icon: "/Icons/CategoriesIcons/Party.svg" },
        { id: 6, label: 'Graduation Party', isChecked: false, icon: "/Icons/CategoriesIcons/Graduation Party.svg" },
        { id: 7, label: 'Baby Shower', isChecked: false, icon: "/Icons/CategoriesIcons/Baby Shower.svg" },
        { id: 8, label: 'Birthday Party', isChecked: false, icon: "/Icons/CategoriesIcons/Birthday party.svg" },
        { id: 9, label: 'Engagement Party', isChecked: false, icon: "/Icons/CategoriesIcons/engagement Party.svg" }
    ],
    rules: [
        { id: 1, label: 'No smoking or vaping allowed inside the venue' },
        { id: 2, label: 'Guests must keep noise levels down after a certain time to avoid disturbing neighbors' },
        {
            id: 3,
            label: 'No outside food or beverages are allowed inside the venue, except for special dietary needs or allergies'
        },
        { id: 4, label: 'Dress code requirements must be followed.' },
        { id: 5, label: 'Guests must respect the property and not damage any furnishings, fixtures or equipment' }
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Spot() {

    const params = useParams();

    const [spotDetails, setSpotDetails] = useState(null)
    const [spotImages, setSpotImages] = useState(null)

    useEffect(()=>{
        console.log("params", params.spotId)
        async function getSpotDetails() {
            const response = await fetch(`http://localhost:5000/api/getspot/${params.spotId}`);
            const data = await response.json();
            console.log("data", data)
            setSpotDetails(data.spot)
            // let images = [data.spot.coverImage, ...data.spot.Images]
            // images.map((image, index) => {
            //     setSpotImages(prevState => [...prevState, {
            //         id: index+1,
            //         name: "Spot Image "+index+1,
            //         url: image
            //     }])
            // })
        }
        getSpotDetails()
    }, [params.spotId])

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a
                                href={product.href}
                                aria-current="page"
                                className="font-medium text-gray-500 hover:text-gray-600"
                            >
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <ImageViewer data={[
                      {
                        id: 1,
                        title: "Image 1",
                        url: "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg"
                      },
                      {
                        id: 2,
                        title: "Image 2",
                        url: "https://cdn.pixabay.com/photo/2017/12/29/12/50/sunset-3047544_1280.jpg"
                      },
                      {
                        id: 3,
                        title: "Image 3",
                        url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
                      },
                      {
                        id: 4,
                        title: "Image 4",
                        url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                      },
                      {
                        id: 5,
                        title: "Image 4",
                        url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                      },
                      {
                        id: 6,
                        title: "Image 4",
                        url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                      }                      
                    ]} />
                    {/* <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                        <div className="h-full w-full object-cover object-center">
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: product.images[0].src
                                },
                                largeImage: {
                                    src: product.images[0].src,
                                    width: 1200,
                                    height: 1800
                                }
                            }} />
                        </div>
                        <img
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            className="h-full w-full object-cover object-center"
                        />
                        <ReactImageZoom width={300} className="h-full w-full object-cover object-center" style={{objectFit: 'cover'}} zoomStyle={{width: 600}} zoomWidth={500} img={product.images[0].src} />
                    </div> */}
                    {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={product.images[1].src}
                                alt={product.images[1].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        <ReactImageZoom width={300} style={{objectFit: 'cover'}} zoomWidth={500} img={product.images[1].src} />
                        </div>
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={product.images[2].src}
                                alt={product.images[2].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div> */}
                    {/* <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                        <img
                            src={product.images[3].src}
                            alt={product.images[3].alt}
                            className="h-full w-full object-cover object-center"
                        />
                    </div> */}
                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {spotDetails ? spotDetails.Name : "Loading..."}
                        </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <div className={"flex flex-row"}>
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">
                                {spotDetails ? "$ "+spotDetails.Price : "Loading..."}
                            </p>

                            {/* Reviews */}
                            <div className=" ml-auto pt-2">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating
                                                        ? "text-gray-900"
                                                        : "text-gray-200",
                                                    "h-5 w-5 flex-shrink-0"
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a
                                        href={reviews.href}
                                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl mt-8 mb-5 font-medium text-gray-900">When are you planning to book the
                            spot?</h3>
                        <div className={"flex flex-col space-y-3"}>
                            <span>Start Date:</span>
                            <input type="date" className={"rounded-lg"} />
                            <span>End Date:</span>
                            <input type="date" className={"rounded-lg"} />
                        </div>
                        <div className={"mt-3 flex flex-col space-y-2"}>
                            <span>Start Time:</span>
                            <input type="time" className={"rounded-lg"} />
                            <span>End Time:</span>
                            <input type="time" className={"rounded-lg"} />
                        </div>

                        <div className="mt-3 flex flex-col space-y-2">
                            <span>Max Number Of Guests</span>
                            <input type="number" placeholder="200" className="rounded-lg" />
                        </div>

                        <form className="mt-10">
                            {/*/!* Colors *!/*/}
                            {/*<div>*/}
                            {/*    <h3 className="text-sm font-medium text-gray-900">Color</h3>*/}

                            {/*    <RadioGroup*/}
                            {/*        value={selectedColor}*/}
                            {/*        onChange={setSelectedColor}*/}
                            {/*        className="mt-4"*/}
                            {/*    >*/}
                            {/*        <RadioGroup.Label className="sr-only">*/}
                            {/*            {" "}*/}
                            {/*            Choose a color{" "}*/}
                            {/*        </RadioGroup.Label>*/}
                            {/*        <div className="flex items-center space-x-3">*/}
                            {/*            {product.colors.map((color) => (*/}
                            {/*                <RadioGroup.Option*/}
                            {/*                    key={color.name}*/}
                            {/*                    value={color}*/}
                            {/*                    className={({active, checked}) =>*/}
                            {/*                        classNames(*/}
                            {/*                            color.selectedClass,*/}
                            {/*                            active && checked ? "ring ring-offset-1" : "",*/}
                            {/*                            !active && checked ? "ring-2" : "",*/}
                            {/*                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                >*/}
                            {/*                    <RadioGroup.Label as="span" className="sr-only">*/}
                            {/*                        {" "}*/}
                            {/*                        {color.name}{" "}*/}
                            {/*                    </RadioGroup.Label>*/}
                            {/*                    <span*/}
                            {/*                        aria-hidden="true"*/}
                            {/*                        className={classNames(*/}
                            {/*                            color.class,*/}
                            {/*                            "h-8 w-8 rounded-full border border-black border-opacity-10"*/}
                            {/*                        )}*/}
                            {/*                    />*/}
                            {/*                </RadioGroup.Option>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    </RadioGroup>*/}
                            {/*</div>*/}

                            {/*/!* Sizes *!/*/}
                            {/*<div className="mt-10">*/}
                            {/*    <div className="flex items-center justify-between">*/}
                            {/*        <h3 className="text-sm font-medium text-gray-900">Size</h3>*/}
                            {/*        <a*/}
                            {/*            href="#"*/}
                            {/*            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"*/}
                            {/*        >*/}
                            {/*            Size guide*/}
                            {/*        </a>*/}
                            {/*    </div>*/}

                            {/*    <RadioGroup*/}
                            {/*        value={selectedSize}*/}
                            {/*        onChange={setSelectedSize}*/}
                            {/*        className="mt-4"*/}
                            {/*    >*/}
                            {/*        <RadioGroup.Label className="sr-only">*/}
                            {/*            {" "}*/}
                            {/*            Choose a size{" "}*/}
                            {/*        </RadioGroup.Label>*/}
                            {/*        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">*/}
                            {/*            {product.sizes.map((size) => (*/}
                            {/*                <RadioGroup.Option*/}
                            {/*                    key={size.name}*/}
                            {/*                    value={size}*/}
                            {/*                    disabled={!size.inStock}*/}
                            {/*                    className={({active}) =>*/}
                            {/*                        classNames(*/}
                            {/*                            size.inStock*/}
                            {/*                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"*/}
                            {/*                                : "cursor-not-allowed bg-gray-50 text-gray-200",*/}
                            {/*                            active ? "ring-2 ring-indigo-500" : "",*/}
                            {/*                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                >*/}
                            {/*                    {({active, checked}) => (*/}
                            {/*                        <>*/}
                            {/*                            <RadioGroup.Label as="span">*/}
                            {/*                                {size.name}*/}
                            {/*                            </RadioGroup.Label>*/}
                            {/*                            {size.inStock ? (*/}
                            {/*                                <span*/}
                            {/*                                    className={classNames(*/}
                            {/*                                        active ? "border" : "border-2",*/}
                            {/*                                        checked*/}
                            {/*                                            ? "border-indigo-500"*/}
                            {/*                                            : "border-transparent",*/}
                            {/*                                        "pointer-events-none absolute -inset-px rounded-md"*/}
                            {/*                                    )}*/}
                            {/*                                    aria-hidden="true"*/}
                            {/*                                />*/}
                            {/*                            ) : (*/}
                            {/*                                <span*/}
                            {/*                                    aria-hidden="true"*/}
                            {/*                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"*/}
                            {/*                                >*/}
                            {/*    <svg*/}
                            {/*        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"*/}
                            {/*        viewBox="0 0 100 100"*/}
                            {/*        preserveAspectRatio="none"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*      <line*/}
                            {/*          x1={0}*/}
                            {/*          y1={100}*/}
                            {/*          x2={100}*/}
                            {/*          y2={0}*/}
                            {/*          vectorEffect="non-scaling-stroke"*/}
                            {/*      />*/}
                            {/*    </svg>*/}
                            {/*  </span>*/}
                            {/*                            )}*/}
                            {/*                        </>*/}
                            {/*                    )}*/}
                            {/*                </RadioGroup.Option>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    </RadioGroup>*/}
                            {/*</div>*/}

                            <Link to={`/checkout${params.spotId}`}
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Continue to book your spot
                            </Link>
                        </form>
                    </div>

                    <div
                        className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{spotDetails ? spotDetails.Description: "Loading..."}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What do you get?</h3>
                            <div className="mt-6">
                                <ul className={"grid grid-rows-3 grid-flow-col gap-4"}>
                                    {product.amenities.map((item) => (
                                        <li key={item.id} className={"flex flex-row space-x-6"}>
                                            <img src={item.icon} alt={"icon"} width={20} height={20} />
                                            <label>
                                                {item.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What the spot is recommended for?</h3>

                            <div className="mt-6">
                                <ul className={"grid grid-rows-3 grid-flow-col gap-4"}>
                                    {product.categories.map((item) => (
                                        <li key={item.id} className={"flex flex-row space-x-6"}>
                                            <img src={item.icon} alt={"icon"} width={20} height={20} />
                                            <label>
                                                {item.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What are the rules for this spot?</h3>

                            <div className="mt-6">
                                <ul className={"flex flex-col space-y-3 list-disc"}>
                                    {spotDetails?.Rules?.map((item) => (
                                        <li key={item.id} className={"flex flex-row space-x-6"}>
                                            <label>
                                                <label className={"mr-4"}>⏺</label>
                                                {item.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">When are we open?</h3>

                            <div className="mt-6">
                                <ul className={"flex flex-col space-y-3 list-disc"}>
                                    { spotDetails ? spotDetails.Timing && Object.keys(spotDetails.Timing).map((item) => (
                                        <li key={item.id} className={"flex flex-row space-x-6"}>
                                            <label>
                                                {/*<label className={"mr-4"}>⏺</label>*/}
                                                {item} : {spotDetails.Timing[item].open} - {spotDetails.Timing[item].close}
                                            </label>
                                        </li>
                                    )) : "Loading..."}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-8">Cancellation Policy:</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
