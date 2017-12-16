import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { getJokes } from '../actions';

class Jokes extends Component {
  componentDidMount() {
    this.props.getJokes();
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id',
      width: 30
    }, {
      Header: 'Type',
      accessor: 'type',
      width: 150
    }, {
      Header: 'Setup',
      accessor: 'setup',
      width: 450
    }, {
      Header: 'Punchline',
      accessor: 'punchline',
      width: 250
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
