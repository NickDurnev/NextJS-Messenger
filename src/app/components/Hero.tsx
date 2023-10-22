"use client"

import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Loader from './Loader';

const Hero = () => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && <Loader />}
            <Spline
                onLoad={() => setLoading(false)}
                scene="https://prod.spline.design/2yU41Or1eP8d7JHb/scene.splinecode"
                style={{ width: '98vw', height: '92vh' }}
            />
        </>
    )
}

export default Hero;