import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

function displayNavBar({children}) {
    const location = useLocation()
    const[navBarAppears, setNavBarAppears] = useState(false)

    useEffect(() => {
        if(location.pathname === '/') {
            setNavBarAppears(false)
        } else {
            setNavBarAppears(true)
        }
    },[location])

    if(navBarAppears) {
        return (children)
    } else {
        return (null)
    }
}

export default displayNavBar