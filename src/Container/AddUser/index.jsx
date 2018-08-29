import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DBActions from '../../store/action/DBActions';
import Service from '../../Service';
let { state } = Service;
const styles = {
    tableDiv: {
        display: 'flex',
        width: '60vw',
        justifyContent: 'space-between',
        paddingTop: '13px',
        paddingBottom: '13px'
    },
    tableParent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}
class AddUser extends Component {
    constructor(props) {
        super(props);
        let { dataObj, inventory, currentUser } = this.props;
        this.allUsers = [];
        for (let i in dataObj) {
            if (dataObj[i].type == 'member') {
                this.allUsers.push(dataObj[i]);
            }
        }
        this.state = {
            allUsers: this.allUsers,
            firstName: '',
            lastName: '',
            imageUrl: null,
            rfid_tag: '',
            currentUser
        }
    }
    addUser = () => {
        let { dataObj, inventory, currentUser } = this.props;
        let { firstName, lastName, rfid_tag, imageUrl } = this.state;
        if (firstName.trim() !== '' && lastName.trim() !== '' && rfid_tag.trim() !== '') {
            if (dataObj[rfid_tag] == undefined) {
                dataObj[rfid_tag] = {
                    type: 'member',
                    name: `${firstName} ${lastName}`,
                    rfid_tag: rfid_tag,
                    imageUrl,
                    current: { lockerId: '', product: [], assignData: "", checkoutDate: "" },
                }
                this.props.setDataObj(dataObj);
                this.setState({ allUsers: [...this.state.allUsers, dataObj[rfid_tag]], firstName: '', lastName: '', rfid_tag: '', imageUrl: null })
            } else {
                alert('This ID already in use');
            }
        } else {
            alert('data badly formated');
        }
    }

    render() {
        let { dataObj, inventory, currentUser } = this.props;
        return (
            <Navbar style={styles.tableParent} history={this.props.history} name={currentUser ? this.state.currentUser.name : 'UserName'} imageUrl={currentUser ? this.state.currentUser.imageUrl : null}>
                <div style={styles.tableParent}>
                    <div>
                        <div>
                            <TextField
                                label="First Name"
                                value={this.state.firstName}
                                onChange={(text) => this.setState({ firstName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last Name"
                                value={this.state.lastName}
                                onChange={(text) => this.setState({ lastName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="rfid_tag"
                                value={this.state.rfid_tag}
                                type='number'
                                onChange={(text) => this.setState({ rfid_tag: text.target.value })}                            // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <Button onClick={this.addUser} variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
                                Add User
                            </Button>
                        </div>
                    </div>

                    <h1 style={{ color: '#34495e' }}>Users</h1>
                    <div style={{
                        display: 'flex',
                        width: '60vw',
                        justifyContent: 'space-between',
                        paddingTop: '13px',
                        paddingBottom: '13px',
                        backgroundColor: '#ecf0f1',
                        color: '#34495e',
                        padding: '15px'
                    }}>
                        <h1 style={{ width: '50%', color: '#34495e' }}>Name</h1>
                        <h1 style={{ width: '50%', color: '#34495e' }}>UserId</h1>
                    </div>
                    {
                        this.state.allUsers.map((data, i) => {

                            if (data)
                                return (
                                    <div key={i} style={{
                                        display: 'flex',
                                        width: '60vw',
                                        justifyContent: 'space-between',
                                        paddingTop: '13px',
                                        paddingBottom: '13px',
                                        backgroundColor: i % 2 === 0 ? '#ecf0f1' : '#bdc3c7',
                                        color: '#34495e',
                                        padding: '15px'
                                    }}
                                    >
                                        <div style={{ display: 'flex', alignSelf: 'left', width: '50%' }}>
                                            {data.name}
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            {data.rfid_tag}
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </Navbar>
        );
    }
}

let mapStateToProps = (state) => {
    console.log(state);
    return {
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);