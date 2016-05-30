import React, { Component, PropTypes } from 'react'
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body'
import RaisedButton from 'material-ui/lib/raised-button'
import IcViewDetail from 'material-ui/lib/svg-icons/action/visibility'
import store from '../store/configureStore'
import * as MainActions from '../actions'

class FindingsList extends React.Component {
  render() {
    const {findings} = this.props
    const toggleFindingDetailDialog = () => {
      console.log("open dialog")
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Titre</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Statut</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {findings.map( finding => (
             <TableRow key={finding.id} >
               <TableRowColumn>{finding.id}</TableRowColumn>
               <TableRowColumn>{finding.get("title")}</TableRowColumn>
               <TableRowColumn>{finding.get("description")}</TableRowColumn>
               <TableRowColumn>{finding.get("statut")}</TableRowColumn>
               <TableRowColumn>
                 <RaisedButton
                   label="Details"
                   primary={true}
                   onClick= {() => {
                     store.dispatch(MainActions.viewFindingDetailsAsync(finding))
                   }}
                   icon={<IcViewDetail />} />
               </TableRowColumn>
             </TableRow>
           ))}
        </TableBody>
      </Table>
    )
  }
}

FindingsList.propTypes = {
  findings: PropTypes.array,
}

export default FindingsList;
