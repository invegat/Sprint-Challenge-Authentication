import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { getJokes } from '../actions';
import '../index.css'

class Jokes extends Component {
  componentDidMount() {
    this.props.getJokes();
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id',
      width: 30,
      Cell: props => <span className="id">{props.value}</span>
    }, {
      Header: 'Type',
      accessor: 'type',
      width: 150,
      Cell: props => <span className="type">{props.value}</span>
    }, {
      Header: 'Setup',
      accessor: 'setup',
      width: 450,
      Cell: props => <span className="setup">{props.value}</span>      
    }, {
      Header: 'Punchline',
      accessor: 'punchline',
      width: 250,
      Cell: props => <span className="punchline">{props.value}</span>       
    }];
  

    return (
      <ReactTable
      data={this.props.jokes}
      columns={columns}
    />

    );
  }
}

const mapStateToProps = state => {
  return {
    jokes: state.jokes
  };
};

export default connect(mapStateToProps, { getJokes })(Jokes);
