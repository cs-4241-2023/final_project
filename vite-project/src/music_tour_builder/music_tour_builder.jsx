import React, {useState, useEffect} from 'react'

function musicTourBuilder() {
    
    //Important Note; Objects and arrays cannot be stored in state in React. Primitive values need to be picked out from the object and stored in state.

    const [musicTourName, setMusicTourName] = useState("") 
    const [musicTourDuration, setMusicTourDuration] = useState(0) 
    const [musicTourContinent, setMusicContinent] = useState("") 
    const [musicTourTargetAudienceAgeRange, setMusicTourTargetAudienceAgeRange] = useState("") 
    const [musicTourHeadliningArtist, setMusicTourHeadliningArtist] = useState("") 
    const [musicTourDirectSupportArtist, setMusicTourDirectSupportArtist] = useState("") 

    useEffect(() => {
        async function getMusicTourName() {
            const response = await fetch('/getMusicTourName', {
                method:'GET'
            })
        
            const tourName = await response.text()
            setMusicTourName(tourName)
        }
        getMusicTourName()
    }, [])

    useEffect(() => {
        async function getMusicTourDuration() {
            const response = await fetch('/getMusicTourDuration', {
                method:'GET'
            })
        
            const tourDuration = await response.text()
            setMusicTourDuration(tourDuration)
        }
        getMusicTourDuration()
    }, [])

    useEffect(() => {
        async function getMusicTourContinent() {
            const response = await fetch('/getMusicTourContinent', {
                method:'GET'
            })
        
            const tourContinent = await response.text()
            setMusicContinent(tourContinent)
        }
        getMusicTourContinent()
    }, [])

    useEffect(() => {
        async function getMusicTourTargetAudienceAgeRange() {
            const response = await fetch('/getMusicTourTargetAudienceAgeRange', {
                method:'GET'
            })
        
            const tourTargetAudienceAgeRange = await response.text()
            setMusicTourTargetAudienceAgeRange(tourTargetAudienceAgeRange)
        }
        getMusicTourTargetAudienceAgeRange()
    }, [])

    useEffect(() => {
        async function getMusicTourHeadliningArtist() {
            const response = await fetch('/getMusicTourHeadliningArtist', {
                method:'GET'
            })
        
            const tourHeadliningArtist = await response.text()
            setMusicTourHeadliningArtist(tourHeadliningArtist)
        }
        getMusicTourHeadliningArtist()
    }, [])

    useEffect(() => {
        async function getMusicTourDirectSupportArtist() {
            const response = await fetch('/getMusicTourDirectSupportArtist', {
                method:'GET'
            })
        
            const tourDirectSupportArtist = await response.text()
            setMusicTourDirectSupportArtist(tourDirectSupportArtist)
        }
        getMusicTourDirectSupportArtist()
    }, [])

    return (
        <div>
            <h2>Build a Fantasy Music Tour</h2>
            <p>The list below provides a high-level format for building a fantasy music tour. To complete a fantasy music tour, information must be entered for the Music Tour Name, Tour Duration, Tour Continent, Target Audience Age Range, Headlining Artist, and Direct Support Artist. To enter information for those fields, edit the text for each item in the list below. Then, submit the entered information to your account using the corresponding button.</p>
            <p>Important details for entering information:</p>
            <ul>
                <li>
                    <p>For the Tour Duration field, enter a number using digits. The duration of a tour must be greater than or equal to 0 days.</p>
                </li>
                <li>
                    <p>For the Target Audience Age Range field, enter the age range in the following format: (#...-#...) where # is a number written in digits. (15-25) is an example of a valid age range entry.</p>
                </li>
            </ul>
            <p>Edit Fantasy Music Tour:</p>
            <ol>
                <li>
                    <p>Music Tour Name:</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourName}</p>
                    <button>Submit Music Tour Name</button>
                </li>
                <li>
                    <p>Tour Duration (Number of Days):</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourDuration}</p>
                    <button>Submit Tour Duration</button>
                </li>
                <li>
                    <p>Tour Continent:</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourContinent}</p>
                    <button>Submit Tour Continent</button>
                </li>
                <li>
                    <p>Target Audience Age Range (#...-#...):</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourTargetAudienceAgeRange}</p>
                    <button>Submit Target Audience Age Range</button>
                </li>
                <li>
                    <p>Headlining Artist:</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourHeadliningArtist}</p>
                    <button>Submit Headlining Artist</button>
                </li>
                <li>
                    <p>Direct Supporting Artist:</p>
                    <p contentEditable = "true" suppressContentEditableWarning = {true}>{musicTourDirectSupportArtist}</p>
                    <button>Submit Direct Supporting Artist</button>
                </li>
            </ol>
        </div>
    )
}

export default musicTourBuilder