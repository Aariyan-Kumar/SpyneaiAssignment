import React from 'react'
import { PostCarForm } from '../components/index'
import { Contanier } from '../components/index'


function AddCars() {
    return (
        <div className='py-8'>
            <Contanier>
                <PostCarForm />
            </Contanier>
        </div>
    )
}

export default AddCars
