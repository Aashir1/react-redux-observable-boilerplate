import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';
import DBActions from '../../store/action/DBActions';
import Service from '../../Service';
import './index.css';
let state = Service.state;

const styles = {
    tableDiv: {
        display: 'flex',
        width: '60vw',
        justifyContent: 'center',
        paddingTop: '13px',
        paddingBottom: '13px'
    },
    tableParent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.inventoryArray = [];
        let { dataObj, currentUser, inventory } = this.props;
        this.findCurrentUserLocker = null;
        for (let i in dataObj) {
            if (dataObj[i].type == 'locker') {
                if (currentUser.rfid_tag == dataObj[i].current.uid) {
                    currentUser.lockerId = i;
                }
            }
        }
        for (let i in inventory) {
            this.inventoryArray.push({ key: i, data: inventory[i] });
        }
        this.lockerCurrentInfo = null;

        this.state = {
            inventoryArray: this.inventoryArray,
            currentUser: this.props.currentUser,
            inventoryId: '',
            tabState: 'Tag In',
            tempArray: [],
            isLockerAssigned: false,
            assignedLocker: {}
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        let { inventoryId, userObj, tabState } = this.state;
        let { dataObj, currentUser, inventory } = this.props;

        this.lockerCurrentInfo = dataObj[currentUser.lockerId];

        if (tabState == 'Tag In') {
            if (inventoryId.trim() !== '' && inventoryId > 0) {
                let userInput = inventoryId;
                userInput = userInput;
                let data = dataObj[userInput], isFound = false;
                if (data) {
                    if (data.type == 'member') {
                        this.props.history.replace('/');
                        return;
                    }
                    if (data.type == 'locker') {
                        //if locker assigned to currentUser alert else assign new one
                        if (currentUser.lockerId == '') {
                            if (dataObj[userInput].isAvailable == true) {
                                currentUser.lockerId = userInput;
                                dataObj[userInput].current.product = this.state.tempArray
                                this.state.tempArray.forEach((data, i) => {
                                    if (inventory[data.rfid_tag].qty > 0) {
                                        inventory[data.rfid_tag].qty -= data.qty;
                                    }
                                })
                                dataObj[currentUser.rfid_tag].current.product = this.state.tempArray;
                                dataObj[userInput].current.uid = currentUser.rfid_tag;
                                dataObj[currentUser.rfid_tag].current.assignDate = new Date();
                                console.log('after assigning dataObj[currentUser.rfid_tag]: ', dataObj[currentUser.rfid_tag]);
                                dataObj[userInput].isAvailable = false;
                                this.setState({ inventoryId: '', isLockerAssigned: true, assignedLocker: dataObj[userInput] });
                                this.props.setCurrentUser(currentUser);
                                this.props.setDataObj(dataObj);
                                this.props.setInventory(inventory);
                                return
                            } else {
                                alert('this locker already in use select another');
                                return;
                            }
                        }
                        else {
                            alert('you have already locker assigned');
                        }
                    }
                }
                if (this.lockerCurrentInfo) {
                    this.lockerCurrentInfo = this.lockerCurrentInfo.current;
                    //if locker assigned
                    let availableInventoryIds = Object.keys(inventory);
                    if (availableInventoryIds.indexOf(inventoryId) !== -1) {
                        inventory[inventoryId].qty -= 1;
                        this.props.setInventory(inventory);
                        if (this.lockerCurrentInfo.product == undefined || this.lockerCurrentInfo.product.lenght == 0) {
                            // push product in locker array
                            this.lockerCurrentInfo['product'] = [{ name: inventory[inventoryId].name, qty: 1, consumeable: inventory[inventoryId].consumeable, rfid_tag: inventoryId }];
                            // push product in user checkin array                        
                            dataObj[currentUser.rfid_tag].current.product = [{ name: inventory[inventoryId].name, qty: 1, consumeable: inventory[inventoryId].consumeable, rfid_tag: inventoryId }];
                            this.props.setDataObj(dataObj);
                        } else {
                            let isInventoryFind = false;
                            // update product in locker array
                            this.lockerCurrentInfo.product.forEach((data, i) => {
                                if (inventory[inventoryId].name == data.name && inventory[inventoryId].qty > 0) {
                                    this.lockerCurrentInfo.product[i].qty += 1;
                                    this.props.setDataObj(dataObj);
                                    isInventoryFind = true;
                                }
                            })
                            if (!isInventoryFind) {
                                this.lockerCurrentInfo.product.push({ name: inventory[inventoryId].name, qty: 1, consumeable: inventory[inventoryId].consumeable, rfid_tag: inventoryId });
                                this.props.setDataObj(dataObj);
                            }
                        }
                    }
                } else {
                    //if locker not assign
                    if (inventory[inventoryId]) {
                        let { tempArray } = this.state, isFound = false;
                        if (tempArray.length == 0) {
                            tempArray.push({ name: inventory[inventoryId].name, qty: 1, consumeable: inventory[inventoryId].consumeable, rfid_tag: inventoryId });

                        } else {
                            tempArray.forEach((data, i) => {
                                if (data.name == inventory[inventoryId].name) {
                                    data.qty += 1;
                                    isFound = true;
                                }
                            });
                            if (!isFound) {
                                tempArray.push({ name: inventory[inventoryId].name, qty: 1, consumeable: inventory[inventoryId].consumeable, rfid_tag: inventoryId });
                            }
                        }
                        this.setState({ tempArray });
                    } else {
                        alert('Data not found');
                    }
                }
            }
        }
        console.log('this.state.tempArray: ', this.state.tempArray);
        this.setState({ inventoryId: '' });
    }
    render() {
        let { dataObj, currentUser, inventory } = this.props;
        return (
            <Navbar history={this.props.history} name={currentUser.name} imageUrl={currentUser.imageUrl
            }>
                <div>
                    <form onSubmit={this.onSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}>
                        <div>
                            <input
                                autoFocus
                                placeholder={'Enter Here'}
                                style={{
                                    width: '30vw',
                                    height: '40px',
                                    fontSize: '20px',
                                    padding: '10px',
                                    color: '#2c3e50'
                                }}
                                value={this.state.inventoryId}
                                onChange={(e) => this.setState({ inventoryId: e.target.value })}
                                onKeyPress={this.keyPress} />
                        </div>
                    </form>
                </div>
                <div style={styles.tableParent}>
                    {
                        this.state.tabState == 'Tag In' ?
                            <div>
                                <h1 style={{ color: '#34495e', textAlign: 'center' }}>Tag In</h1>
                                {
                                    (currentUser.lockerId !== '' && dataObj[currentUser.lockerId].current.product) ?
                                        // dataObj[currentUser.lockerId].current.product ?
                                        dataObj[currentUser.lockerId].current.product.map((data, i) => {
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
                                                    <div >
                                                        {data.name}
                                                    </div>
                                                    <div>
                                                        {data.qty}
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        this.state.tempArray.map((data, i) => {
                                            console.log('data: ', data);
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
                                                    <div >
                                                        {data.name}
                                                    </div>
                                                    <div>
                                                        {data.qty}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    // : null
                                }
                            </div>
                            :
                            <div>
                                <h1 style={{ color: '#34495e' }}>Tag Out</h1>
                                {
                                    this.state.inventoryArray.length > 0 ?
                                        <div style={styles.tableDiv}>
                                            <h2>Products</h2>
                                        </div>
                                        :
                                        null
                                }

                            </div>
                    }
                    {
                        currentUser.lockerId !== '' ?
                            <div className="locker-item" style={
                                {
                                    width: '25%',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '5px',
                                    paddingTop: '15px',
                                    marginLeft: '20px',
                                    marginRight: '20px',
                                    marginTop: '20px'
                                }
                            }>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '7px'
                                }}>
                                    {`Alocated to: ${currentUser.name}`}
                                </div>
                                <div>
                                    {`ID: ${dataObj[currentUser.lockerId].name}`}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </Navbar >
        );
    }
}

let mapStateToProps = (state) => {
    console.log(state);
    return {
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser,
        loadDataIsProgress: state.dbReducer.loadDataIsProgress
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);