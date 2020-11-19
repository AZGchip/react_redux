import React, { Component } from "react";

class Results extends Component {
    state = {
        data: ""
    }
    componentDidMount() {
        if (this.props.searchResults !== "") {
            
        }
    }
    componentDidUpdate() {

    }



    render() {
        return (
            <div>
                {console.log(this.props.searchResults)}
            </div>
        )
    }
}
export default Results