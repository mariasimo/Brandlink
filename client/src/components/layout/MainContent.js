import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { Content } from '../project/Content';
import Dropdown from '../utils/Dropdown';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectService = new ProjectService();
  }

  displayRows = () => {
    const userId = this.props.user.id

    this.projectService.displayRows(userId)
    .then(rows => {
      this.setState({
        ...this.state,
        rows: rows
      })

      console.log(this.state)
    })
  }

  addNewRow = layout => {
    const userId = this.props.user.id
    this.projectService.createNewRow({layout, userId }).then(
      projectWithRowAdded => {
        this.setState({
          ...this.state,
          rows: projectWithRowAdded.rows
        });
      },
      error => console.log(error)
    );
  };

  // deleteRow = rowId => {
  //   this.projectService.deleteRow(rowId).then(
  //     project => {
  //       console.log(project)
  //       this.fetchOneProject()
  //     },
  //     error => {
  //       const { message } = error;
  //       console.error(message);
  //     }
  //   );
  // };

  addContent = (type, rowId, slotIdx) => {
    const userId = this.props.user.id

    console.log(type, rowId, slotIdx)

    this.projectService
      .updateRow({ userId, type, rowId, slotIdx })
      .then(rowUpdated => {
        console.log("rowUpdated")
        this.displayRows()
      });
  };

  componentDidMount() {
    this.displayRows()
  }

  render() {
    const path = this.props.path

    return (
      <div
        className={`main-content section is-paddingless	 ${this.props.menuIsOpen}`}
      >
        <section className='section rows-container is-paddingless	'>

        {this.state.rows &&
          this.state.rows.map((row, rowIdx) => (
          <div key={row._id} className='columns is-multiline is-marginless'>
            {row.slots.map((slot, slotIdx) =>(
              <div
                key={slotIdx}
                id={`slot-${rowIdx}-${slotIdx}`}
                className={`${row.layout} column row slot`}
              >
                    
                  {row.content[slotIdx] &&
                  <Content slot={row.content[slotIdx]} path={path}></Content>}

                  {!row.content[slotIdx] && 
                    <Dropdown row={row} slotIdx={slotIdx} addContent={(type, rowId, slotIdx) =>this.addContent(type, rowId, slotIdx)}></Dropdown>
                  }
                
              </div>          
            ))}

            <button className='close' onClick={() => this.deleteRow(row._id)}>Cerrar</button>
          </div>
        ))}
          
        

          <div className='column is-full layout-btn-container'>
            <a className='header'>Add new row</a>
            <div className='inner'>
              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-full')}
              >
                <img src={`${process.env.REACT_APP_URL}/full.svg`}></img>
                Full
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-half')}
              >
                <img src={`${process.env.REACT_APP_URL}/half.svg`}></img>
                Half
              </div>

              <div
                className='layout-btn'
                onClick={() => this.addNewRow('is-one-third')}
              >
                <img src={`${process.env.REACT_APP_URL}/third.svg`}></img>
                Third
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
