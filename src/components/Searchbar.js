import React, { Component } from 'react';


class Searchbar extends Component {
    constructor(props) {
        super(props)
        // searchby is default query
        this.state = {
            searchtype: "",
            searchby: "?query=",
            text: "",
            searchResults: []
        };
    }
   


    // when search filter is changed
    handleSearchChange = (event) => {
        this.setState({ searchtype: event.target.value });
    };
    // when searchby selector is changed
    handleSearchByChange = (event) => {
        this.setState({ searchby: event.target.value });
    };
    //when text is entered
    handleText = (event) => {
        this.setState({ text: event.target.value })
    }


    // when search button is pressed
    buildAndCall = (event) => {
        // stops reload from form submit
        event.preventDefault();
        //basic api call 
        const defaultCall = "http://hn.algolia.com/api/v1/search"
        // assigns variables using the state of the search bar
        let text = this.state.text;
        let tag = this.state.searchtype;
        let searchBy = this.state.searchby;
        let query;
        //makes sure searchbar isnt empty before searching 
        if (text !== "" || text.replace(/\s/g, "") !== "") {
            console.log(tag)
            if (tag === "&tags=author_") {
                query = defaultCall + searchBy + tag + text
            }
            else {
                query = defaultCall + searchBy + text + tag
            }
            console.log("searching " + query);
            //api call
            fetch(query)
                .then(res => res.json())
                .then(
                    (result) => {
                        //returned data is formated and saved to state
                        let results = []
                        results = result.hits.map(data =>
                            <div className="col-md-3 m-2 border-dark">
                                <h3>{data.title}</h3>
                                <h4>by {data.author}</h4>
                                <p>{data.created_at}</p>
                            </div>)
                        console.log(results)
                        this.setState({ searchResults: results })

                    },

                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
            

        }
        else { this.setState({searchResults:<div className="text-danger">please fill in search box</div>}) }
    };

    render() {

        return (
            <div>
                {/* title */}
                <h2>Hacker News Searcher</h2>
                <form>
                    {/* Radio buttons */}
                    <input type="radio" name="searchfilter" value="&tags=story" id="story" onChange={this.handleSearchChange} />
                    <label htmlFor="story">Story</label>
                    <br />
                    <input type="radio" name="searchfilter" value="&tags=poll" id="poll" onChange={this.handleSearchChange} />
                    <label htmlFor="poll">Poll</label>
                    <br />
                    <input type="radio" name="searchfilter" value="&tags=author_" id="author" onChange={this.handleSearchChange} />
                    <label htmlFor="author">Author</label>
                    <br />
                    {/* search box */}
                    <input type="text" onChange={this.handleText} />
                    {/* date/relevence selector */}
                    <select onChange={this.handleSearchByChange}>
                        <option value="?query=">Relevance</option>
                        <option value="_by_date?=">Date</option>
                    </select>
                    <button onClick={this.buildAndCall}>Search</button>

                </form>
                {/* results box */}
                <div>
                    {this.state.searchResults}
                </div>

            </div>

        )
    }
}








export default Searchbar