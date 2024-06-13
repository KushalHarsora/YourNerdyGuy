import React from 'react';

const Home = ({ params }: { params: { id: string } }) => {
    return (
        <React.Fragment>
            <div className=' h-screen w-screen flex justify-center items-center text-2xl font-bold'>
                Hello {params.id}
            </div>
        </React.Fragment>
    )
}

export default Home