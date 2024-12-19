import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'

function RouterConfig() {
    return (
        <Routes>
            <Route exact path='/' element={< Auth />} />
            <Route exact path='/home' element={<Home />} />
        </Routes>

    )
}

export default RouterConfig