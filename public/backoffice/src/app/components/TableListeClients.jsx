import React, { Component, PropTypes } from 'react'
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

class TableListeClients extends React.Component {
  render() {
    const { clientsData }  = this.props
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Firstname</TableHeaderColumn>
              <TableHeaderColumn>Lastname</TableHeaderColumn>
              <TableHeaderColumn>E-mail</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody>

          {clientsData.map( (liste, index) => (
             <TableRow key={index} >
               <TableRowColumn>{liste.id}</TableRowColumn>
               <TableRowColumn>{liste.attributes.prenom}</TableRowColumn>
               <TableRowColumn>{liste.attributes.nom}</TableRowColumn>
               <TableRowColumn>{liste.attributes.email}</TableRowColumn>
             </TableRow>
           ))}

          </TableBody>
        </Table>
      </div>
    )
  }
}

TableListeClients.propTypes = {
  clientsData: PropTypes.array,
}

export default TableListeClients
