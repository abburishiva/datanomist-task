import React, { Component } from 'react';

export default class ComponentA extends Component {
    state = {
        usersData: this.props.data.slice(0, 10),
        searchText: "",
        searchedResults: []
    };
    handleOnChange = event => {
        this.setState({
            searchText: event.target.value
        }, () => this.searchCandidateData())
    };
    searchCandidateData = () => {
        const usersDataCopy = [...this.state.usersData];
        const regex = new RegExp(this.state.searchText, "gi");
        const searchedResults = usersDataCopy.reduce((acc, results) => {
            if (results && results.first_name.match(regex)) {
                acc.push(results)
            };
            return acc;
        }, []);
        this.setState({ searchedResults });
    };

    displayData = data => (
        data && data.map((val, i) => (
            <div className="card" key={i}>
                <div className="card-header">
                    <a className="card-link" data-toggle="collapse" href={`#collapse${i}`}>
                        {val.first_name}
                    </a>
                </div>
                <div id={`collapse${i}`} className={`collapse ${i === 0 && "show"}`} data-parent="#accordion">
                    <div className="card-body">
                        <b>Full Name:</b> {`${val.first_name} ${val.last_name}`}<br />
                        <b>Email:</b> {val.email}<br />
                        <b>Gender:</b> {val.gender}
                    </div>
                </div>
            </div>
        ))
    )
    render() {
        const { usersData, searchText, searchedResults } = this.state;
        return (
            <div className="col-md-4 ">
                <div className="card card-body shadow-sm">
                    <h4>Search the candidates</h4>
                    <input type="text" className="form-control my-3" placeholder="Search " onChange={this.handleOnChange} />
                    <div id="accordion">
                        {searchText ? this.displayData(searchedResults) : this.displayData(usersData)}
                        {searchText.length > 0 && searchedResults.length === 0 && <p className="text-center text-danger">No results found</p>}
                    </div>
                </div>
            </div>
        )
    }
}
