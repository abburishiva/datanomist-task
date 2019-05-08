import React, { Component } from 'react'

export default class ComponentB extends Component {
    state = {
        usersData: this.props.data.slice(0, 10),
        searchText: "",
        searchedResults: [],
        selectedValue: ""
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
                    <a className="card-link" data-toggle="collapse" href={`#collapse${i}b`}>
                        {val.first_name}
                    </a>
                </div>
                <div id={`collapse${i}b`} className={`collapse `} data-parent="#accordion2">
                    <div className="card-body">
                        <b>Full Name:</b> {`${val.first_name} ${val.last_name}`}<br />
                        <b>Email:</b> {val.email}<br />
                        <b>Gender:</b> {val.gender}
                    </div>
                </div>
            </div>
        ))
    );
    handleClear = () => this.setState({ searchText: "" })
    render() {
        const { usersData, searchText, searchedResults } = this.state;

        return (
            <div className="col-md-4 ">
                <div className="card card-body shadow-sm">
                    <h4>Select the candidates</h4>
                    <div className="row">
                        <div className="col-md-10">
                            <div className="form-group">
                                <select className="form-control mt-3" onChange={this.handleOnChange}>
                                    <option value="" disabled selected>Select an option</option>
                                    {usersData.map((val, i) => <React.Fragment key={i}>
                                        <option value={`${val.first_name}`} >{val.first_name}</option>
                                    </React.Fragment>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-sm btn-danger my-3 float-right" onClick={this.handleClear}>Clear</button>
                        </div>
                    </div>
                    <div id="accordion2">
                        {searchText ? this.displayData(searchedResults) : this.displayData(usersData)}
                        {searchText.length > 0 && searchedResults.length === 0 && <p className="text-center text-danger">No results found</p>}
                    </div>
                </div>
            </div>
        )
    }
}
