import React from 'react'

function musicTrendsInformation() {
    return (
            <>
            <div className="App">
                <h1>Dropdown Demo</h1>
                {/* <select>
                    <option value="New Genres" >New Genres</option>
                    <option value="Revived Genres">Revived Genres</option>
                    <option value="Technology in Music" >Technology in Music</option>
                </select> */}
                <div>
    
                    <Link to = "/newGenre">
                        <button>New Genres</button>
                    </Link>
                    <Link to = "/revivedGenres">
                        <button>Revived Genres</button>
                    </Link>
                    <Link to = "/technology">
                        <button>Technology in Music</button>
                    </Link>
    
                </div>
                
               
                
                {/* <button onClick = {handleRevived}>Revived Genres</button>
                <button onClick = {handleTechnology}>Technology in Music</button> */}
            </div>
            <h2>Genre Trend</h2>
            <p> https://daigr.am/d58e7166.svg</p>
            <h2>New Genres</h2>
            <h3>Jersey Drill </h3>
            <p>From New Jersey, this genre is a regional variant of UK drill, combining aggressive beats with distinct local music </p>
            <h3>TikTok Pop</h3>
            <p>Driven by the virality on the TikTok platform, this genre showcases songs and artists that gain popularity through viral challenges and trends on the app</p>
            <h3>Eco-Folk</h3>
            <p>Eco-Folk genre artists craft songs around themes of sustainability, conservation, and the beauty of nature. </p>
    
            <h2>Revived Genres</h2>
            <h3>70s Rock</h3>
            <p>This genre has come back due to film sound tracks like "Guardians of The Galaxy" </p>
            <h3>Blues Revival</h3>
            <p>The blues genre saw a revival in 2023, as seen in radio shows and other platforms  </p>
            <h3>R&B Revival</h3>
            <p>R&B has made a return in 2023, having nostalgic emotion while also adding new twists to keep the genre alive </p>
            <h2>Technology in Music</h2>
            <h3>AI-Generated Music</h3>
            <p>This genre melds AI with different music, allowing computers to compose new music, blurring the lines between human and machine created music.</p>
            <h3>Music Consumption</h3>
            <p>The shift from analog to digital music has fundamentally changed the way that we consume music, allowing users to listen to music anytime, anywhere.</p>
            <h3>Virtual Reality</h3>
            <p> VR technologies are being used to create musical experiences,including virtual concerts which became particularly popular during the pandemic era </p>
            </>
    )
}

export default musicTrendsInformation