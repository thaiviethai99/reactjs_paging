import React, { Component } from 'react';
import TableRow from './TableRow';
import API from '../axios';
import Pagination from "react-js-pagination";

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {
        news: [],
        activePage: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 5,
      };
      this.handlePageChange = this.handlePageChange.bind(this);
    }



    handlePageChange(pageNumber) {
        var randDom=Math.random();
        API.get(`list?v=${randDom}&page=${pageNumber}`)
            .then(response => {
                this.setState({
                    news: response.data.data,
                    activePage: pageNumber,
            });
        })
    }


      componentDidMount(){
      var randDom=Math.random();
      API.get(`list?$v=${randDom}&page=${this.state.activePage}`,{cache:false})
        .then(response => {
          this.setState({
            news: response.data.data,
            activePage: response.data.current_page,
            itemsCountPerPage: response.data.per_page,
            totalItemsCount: response.data.total,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    tabRow(){
      return this.state.news.map(function(object, i){
          return <TableRow obj={object} key={i}/>;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">News List</h3>
          <div style={{float: 'right'}}>
          <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
          </div>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
          <div style={{float: 'right'}}>
          <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
          </div>
        </div>
      );
    }
  }