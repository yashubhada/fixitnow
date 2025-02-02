import React from 'react'
import NotFoundImg from '../images/not-found.svg'

const NotFound: React.FC = () => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div>
                <img
                    src={NotFoundImg}
                    alt="Not Found"
                    className='w-36 md:w-56 mx-auto'
                />
                <h1 className='text-center mt-10'>Waiting for User to Send a Request, No Service Request Available to Verify</h1>
            </div>
        </div>
    )
}

export default NotFound
