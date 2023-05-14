import React from 'react'
import { useParams, Link } from 'react-router-dom'

function PostPayment() {

    const { paymentStatus } = useParams()

  return (
    <div className="flex flex-col items-center justify-center py-8">
        {
            paymentStatus === "success" ? (
                <div className="flex flex-col items-center justify-center">
                    <img src="/success.svg" alt="success" className="w-1/4 my-8"/>
                    <h1 className="text-3xl font-bold text-[#3cdbfb]">Payment Successful</h1>
                    <p className="text-xl font-bold text-[#3cdbfb]">Thank you for using our services</p>
                    <p className='text-lg font-medium my-6 black'>
                        An Email with Invoice has been sent to your Registered Email
                    </p>
                    {/* Go to home button */}
                    <Link to='/'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 my-4 px-4 rounded-md'>
                            Go to Home
                            {/* below is svg tilted arrow to top right */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img src="/failed.svg" alt="failed" className="w-1/4 my-8"/>
                    <h1 className="text-3xl font-bold text-red-500">Payment Failed</h1>
                    <p className="text-xl font-bold my-3 text-red-500">Please try again</p>
                    {/* Go back button */}
                    <Link to='/'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 my-4 px-4 rounded-md'>
                            Go Back
                            {/* below is svg tilted arrow to top right */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default PostPayment