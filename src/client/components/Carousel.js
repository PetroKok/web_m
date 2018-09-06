import React from 'react'

export const Carousel = (props) => {
    let arr = [
        {
            path: "public/files-photo/downhill_1.jpg",
            text: "Hard jump"
        },
        {
            path: "public/files-photo/downhill_2.jpg",
            text: "Sweeeeet"
        },
        {
            path: "public/files-photo/downhill_3.jpg",
            text: "One more bicycle."
        }
    ];

    if(props.data){
        arr = props.data
    }

    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {
                    arr.map((i, k) => {
                        return k === 0 ?
                            <li data-target="#myCarousel" key={k} data-slide-to={k} className="active"/>
                            :
                            <li data-target="#myCarousel" key={k} data-slide-to={k} className=""/>
                    })
                }
            </ol>
            <div className="carousel-inner">
                {
                    arr.map((i, k) => {
                        return k === 0 ?
                            <div className="carousel-item active" key={k}>
                                <img className="first-slide"
                                     src={'/' + i.path}
                                     alt="First slide" style={{width: "100%"}}/>
                                <div className="container">
                                    <div className="carousel-caption text-center">
                                        <h1 className="text-white">{i.text}</h1>
                                    </div>
                                </div>
                            </div> :
                            <div className="carousel-item" key={k}>
                                <img className="first-slide"
                                     src={'/' + i.path}
                                     alt="First slide" style={{width: "100%"}}/>
                                <div className="container">
                                    <div className="carousel-caption text-center text-white">
                                        <h1 className="text-white">{i.text}</h1>
                                    </div>
                                </div>
                            </div>
                    })
                }
            </div>
            <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )

}
