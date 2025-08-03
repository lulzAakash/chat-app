import React, { Children } from 'react'
import Layout from '../components/Layout'

const MainScreen = ({ title, children }) => {
    return (
        <Layout>
            <div className='flex flex-col md:px-32'>
                {
                    title && (
                        <>
                            <h1 className='text-5xl md:text-6xl mx-20 mt-20 mb-5'>{title}</h1>
                            <div className='border-b-2 border-slate-400 md:w-1/2 mx-20'></div>
                        </>
                    )
                }
                {children}
            </div>
        </Layout>
    )
}

export default MainScreen
