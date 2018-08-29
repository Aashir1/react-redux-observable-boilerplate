import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChartIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import AddPerson from '@material-ui/icons/PersonAdd';
import InputIcon from '@material-ui/icons/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Appbar from '../Appbar';
import DBActions from '../../store/action/DBActions';
import Service from '../../Service';
import './index.css';
let state = Service.state;

const color = '#3f3f3f'
const styles = {
    listText: {
        fontSize: '17px',
        fontFamily: 'sans-serif',
        paddingLeft: '15px',
        color: 'white',
        fontWeight: 'bold',
    },
    circularStyle: {
        height: '87vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: 'table',
            colorObj: {
                home: '#6c6c6c',
                products: '#6c6c6c',
                lockers: '#6c6c6c',
                checkout: '#6c6c6c'
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        // if (nextProps.user === null) {

        //   this.props.history.replace('/');
        // }
    }

    clicked = (name) => {
        let { currentUser, dataObj, inventory } = this.props;
        console.log('name: ', name);
        if (name == 'home') {
            if (currentUser !== null) {
                this.props.history.push(`/${name}`);
                return;
            } else {
                alert("Sign In Please");
                return;
            }
        }
        let obj = this.state.colorObj;
        for (let i in obj) {
            obj[i] = '#6c6c6c'
        }
        obj[name] = '#37a4d2';
        this.setState({ colorObj: obj });
        if (name == 'checkout') {
            // let lockerHistory = state.lockers[state.currentUser.lockerId].history;
            // let checkoutInfo = state.lockers[state.currentUser.lockerId].current;
            // checkoutInfo.date = new Date();
            // checkoutInfo.checkout = true;
            // lockerHistory.push(checkoutInfo);
            // if(checkoutInfo.product){
            //     checkoutInfo.product.forEach((data, i) => {
            //         // let availableInventoryIds = Object.keys(state.inventory);
            //         // if (data.id)
            //         state.inventory[data.id].qty += data.qty;
            //     })
            //     state.lockers[state.currentUser.lockerId].current = null;
            //     state.lockers[state.currentUser.lockerId].isAvailable = true;
            //     console.log('locker Info: ', state.lockers[state.currentUser.lockerId])
            // }
            this.props.history.replace(`/`);
        }
        else {
            this.props.history.push(`/${name}`);
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ width: '25vw', position: 'fixed', border: "2px solid", backgroundColor: "#3d3d3d", height: '100vh' }} className='col-1'>
                    <List component="nav" >
                        <ListItem button style={{ padding: 0, margin: 0 }} onClick={() => this.clicked("kitchen")} className='align-center'>
                            <h1 style={{ color: 'white', margin: 14, padding: 1 }} className='list-heading'>Admin Panel</h1>
                        </ListItem>
                        <Divider className='list-text' />
                        <ListItem button onClick={() => this.clicked("home")} className='align-center'>
                            <ListItemIcon>
                                <DashboardIcon style={{ marginRight: "0px", color: this.state.colorObj.home }} />
                            </ListItemIcon>
                            <p style={styles.listText} className='list-text'>Home</p>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => this.clicked('lockers')} className='align-center'>
                            <ListItemIcon>
                                <ChartIcon style={{ marginRight: "0px", color: this.state.colorObj.lockers }} />
                            </ListItemIcon>
                            <p style={styles.listText} className='list-text'>Lockers</p>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => this.clicked('products')} className='align-center'>
                            <ListItemIcon>
                                <AddIcon style={{ marginRight: "0px", color: this.state.colorObj.products }} />
                            </ListItemIcon>
                            <p style={styles.listText} className='list-text'>Products</p>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => this.clicked('addUser')} className='align-center'>
                            <ListItemIcon>
                                <AddPerson style={{ marginRight: "0px", color: this.state.colorObj.checkout }} />
                            </ListItemIcon>
                            <p style={styles.listText} className='list-text'>Add User</p>
                        </ListItem>
                        <ListItem button onClick={() => this.clicked('checkout')} className='align-center'>
                            <ListItemIcon>
                                <InputIcon style={{ marginRight: "0px", color: this.state.colorObj.checkout }} />
                            </ListItemIcon>
                            <p style={styles.listText} className='list-text'>Checkout</p>
                        </ListItem>
                        <Divider />
                    </List>
                </div>
                <div style={{ width: '75vw', marginLeft: '25vw', overflow: 'auto' }} className='col-2'>
                    <Appbar name={this.props.name} imageUrl={this.props.imageUrl} />
                    {this.props.children}
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    console.log(state);
    return {
        loadDataIsProgress: state.dbReducer.loadDataIsProgress,
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => dispatch(DBActions.loadData()),
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
