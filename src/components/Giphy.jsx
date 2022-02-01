import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";


const Giphy = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [currentPage] = useState(1);
    const [itemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "6u3vyPYZtNBKlt0EU09o6wZs04DuV99G",
                        limit: 10
                    }
                });

                console.log(results);
                setData(results.data.data);
            } catch (err) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderGifs = () => {
        if (isLoading) {
            return <Loader />;
        }
        return currentItems.map(el => {
            return (
                <div key={el.id} className="gifGiphy">
                    <img src={el.images.fixed_height.url} alt="" />
                </div>
            );
        });
    };
    const renderError = () => {
        if (isError) {
            return (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    Un problème est survenue, veuillez réessayer plus tard
                </div>
            );
        }
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "6u3vyPYZtNBKlt0EU09o6wZs04DuV99G",
                    q: search,
                    limit: 10
                }
            });
            setData(results.data.data);
        } catch (err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        }

        setIsLoading(false);
    };

    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Recherche..."
                    className="form-control"
                />
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary mx-2"
                >
                    Chercher un GIF
                </button>
            </form>
            <div className="container gifsGiphy">{renderGifs()}</div>
        </div>
    );
};

export default Giphy;