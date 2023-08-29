import React from 'react'


function AminitiesBar() {

    const aminities = [
        {
            icon: '',
            handler: () => { }
        }
    ]
    

    return (
        <div className='bg-white rounded-full shadow-xl flex gap-2 px-9 py-3'>
            <div className='flex gap-2'>
                {
                    [1, 2, 3, 4, 5, 6].map((value, i) => (
                        <div key={`Aminities-${i}-spot`} className={`p-2 border-r-2 last:border-r-0`}>
                            👍
                        </div>
                    ))
                }
            </div>
            <div className='rounded-full p-3 bg-blue-600 hover:bg-blue-700 cursor-pointer h-full'>
                <img className='w-6 m-auto' src={'../../../../public/Icons/BarIcons/filter.png'} alt="" />
            </div>
        </div>
    )
}

export default AminitiesBar