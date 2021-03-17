import React, { useState } from 'react';

const WeatherInput = () => {
    const [location, setLocation] = useState('')
    const [days, setDays] = useState('')

    return(
        <form>
            <label>
                Location:
                <input type="text" name="location" />
            </label>
            <label>
                Days:
                <input type="text" name="location" />
            </label>
        </form>
    )
}

export default WeatherInput