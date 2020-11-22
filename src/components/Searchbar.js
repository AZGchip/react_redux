import React, { Component } from 'react';
import { connect } from "react-redux"


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
    handleTextChange = (event) => {
        this.props.onChangeName(event.target.value)
    }

    handleNameChange = (event) => {
        
      }
    // when search button is pressed
    buildAndCall = (event) => {

        // store.dispatch(saveSearch())
        // stops reload from form submit
        event.preventDefault();
        //update redux through 
        this.props.onAddName()
        //basic api call 
        const defaultCall = "http://hn.algolia.com/api/v1/search"
        // assigns variables using the state of the search bar
        let text = this.props.text;
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
        else { this.setState({ searchResults: <div className="text-danger">please fill in search box</div> }) }
    };

    render() {

        return (
            <div className="container">
                {/* title */}
                <h2 className="row text-center">Hacker News Searcher</h2><hr/>
                <form className="col-md-8">
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
                    <input type="text" onChange={this.handleTextChange} />
                    {/* date/relevence selector */}
                    <select onChange={this.handleSearchByChange}>
                        <option value="?query=">Relevance</option>
                        <option value="_by_date?=">Date</option>
                    </select>
                    <button onClick={this.buildAndCall}>Search</button>

                </form>
                    <div className="col-md-4">
                        <h4>Previous Searches</h4>
                        {this.props.searches && this.props.searches.map(text => (
                            <div className="" key={text}> {text}</div>
                        ))}
                    </div>
                {/* results box */}
                <div className="row ">
                    {this.state.searchResults}
                </div>

            </div>

        )
    }
}
//allows the component to access redux state by adding it to props
const mapStatetoProps = (state) => {
    return {
        text: state.text,
        searches: state.searches
    }
}
//allows the component to manipulate the redux state
const mapDispatchtoProps = (dispatch) => {
    return {
        onChangeName: (text) => dispatch({ type: "CHANGE_TEXT", text: text }),
        onAddName: () => dispatch({ type: "ADD_SEARCH" }),
    }
}






export default connect(mapStatetoProps, mapDispatchtoProps)(Searchbar);