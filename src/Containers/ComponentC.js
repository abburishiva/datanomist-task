import React, { Component } from 'react'

export default class ComponentC extends Component {
    state = {
        usersData: this.props.data.slice(0, 10),
        arrow: null,
        index: null
    };
    displayData = data => (
        data && data.map((val, i) => (
            <div className="card" key={i}>
                <div className="card-header">

                    <a className="card-link" data-toggle="collapse" href={`#collapse${i}c`} onClick={() => this.displayArrow(val.id, i)}>
                        <i className={`fa fa-caret-${i === this.state.index ? "down" : "right"} text-primary`}></i>&nbsp;
                        {val.first_name}
                    </a>
                </div>
                <div id={`collapse${i}c`} className={`collapse ${i === 0 && "show"}`} data-parent="#accordion3">
                    <div className="card-body">
                        <b>Full Name:</b> {`${val.first_name} ${val.last_name}`}<br />
                        <b>Email:</b> {val.email}<br />
                        <b>Gender:</b> {val.gender}
                    </div>
                </div>
            </div>
        ))
    );
    displayArrow = (val, key) => {
        console.log(val, key + 1)
        if (val === key + 1) {
            this.setState({ arrow: "down", index: key })
        }
    }
    render() {
        const { usersData } = this.state;
        return (
            <div className="col-md-4 ">
                <div className="card card-body shadow-sm">
                    <h4>List of the candidates</h4>
                    <div id="accordion3">
                        {this.displayData(usersData)}
                    </div>
                </div>
            </div>
        )
    }
}
