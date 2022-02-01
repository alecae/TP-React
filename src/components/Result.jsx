import React from 'react'

function Result({ gifs }) {
    console.log(gifs)
    return (
        <div className="resultatGrid">
            {gifs.map(gif => {
                return (
                    <div className="gifsTenor" key={gif.id}>
                        <a href={gif.url} target="_blank" rel="noopener noreferrer"><img src={gif.media[0].tinygif.url} alt='' /></a>
                    </div>
                )
            })}
        </div>
    )
}

export default Result;