import React, { Component } from 'react';
import { connect } from 'react-redux';
import Serivce from '../../Service';
import DBActions from '../../store/action/DBActions';
import CircularProgress from '@material-ui/core/CircularProgress';
let state = Serivce.state;
class IdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
        }
        // this.timer = setInterval(function () {
        //     console.log('now function loaded');
        //     chrome.nfc.read(device, { timeout: 1000 }, function (type, ndef) {
        //         if (!!type && !!ndef) {
        //             console.log('Type: ', type);
        //             console.log('Indef: ', ndef)
        //         }
        //     });
        // }, 1000);
    }
    componentDidMount() {
        this.props.loadData();
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    onSubmit = (e) => {
        e.preventDefault();
        let { data, userInput } = this.state;
        let { dataObj, inventory, currentUser } = this.props;
        let flag = false, currUser = {}, isCheckOut = false;
        if (userInput.trim() !== "" && userInput > 0) {
            userInput = userInput;
            let data = dataObj[userInput], isFound = false;
            if (data) {
                if (data.type == 'member') {
                    let currentUser = {
                        rfid_tag: data.rfid_tag,
                        name: data.name,
                        imageUrl: data.imageUrl,
                        userData: [],
                        lockerId: ''
                    }
                    this.props.setCurrentUser(currentUser);
                    this.props.history.replace('home');
                }
                if (data.type == 'locker') {
                    let getLockerCurrentInfo = dataObj[userInput].current;
                    let getUserCurrentInfo = dataObj[userInput].current;
                    let historyObjUser = {}, historyObjLocker = {}, obj = {};
                    // let lockerHistory = dataObj[userInput].history;
                    // let userInfoHistory = [];

                    //to validate locker assigned or not to the user
                    if (!dataObj[userInput].current.uid) {
                        this.setState({ userInput: '' })
                        alert('this locker is empty');
                        return;
                    }
                    historyObjUser = Object.assign({}, getLockerCurrentInfo, { checkoutDate: new Date(), checkout: 'done' });
                    historyObjLocker = Object.assign({}, getUserCurrentInfo, { checkoutDate: new Date(), checkout: 'done' });
                    obj = {
                        historyObjUser,
                        historyObjLocker,
                        memberId: dataObj[userInput].current.uid,
                        lockerId: dataObj[userInput].rfid_tag
                    }

                    if (getLockerCurrentInfo.product) {
                        getLockerCurrentInfo.product.forEach((data, i) => {
                            console.log(data);
                            if (!data.consumeable) {
                                inventory[data.rfid_tag].qty += data.qty;
                            }
                        })
                        alert(" Checkout of " + dataObj[userInput].name + " is Done");
                        dataObj[dataObj[userInput].current.uid].current = { lockerId: '', product: [], assignDate: "", checkoutDate: "" }
                        dataObj[userInput].isAvailable = true;
                        dataObj[userInput].current = { uid: '', product: [], checkDate: "", checkout: "" };
                        currentUser = null;
                        this.props.setCurrentUser(null);
                        this.setState({ userInput: '' });
                    }
                    this.props.setInventory(inventory);
                    this.props.setDataObj(dataObj);
                    this.props.pushHistory(obj);

                    // const pushId = firebase.database().ref(`member-history/${memberId}/`).push().key

                    // var multipath = {};
                    // multipath[`member-history/${memberId}/${pushId}`] = {}
                    // multipath[`locker-history/${lockerId}/${pushId}`] = {}

                    // firebase.database().ref('/').update(multipath);
                }
            } else {
                this.setState({ userInput: '' });
                alert('wrong entry')
            }
        }
    }

    syncData = () => {
        console.log('lastSync: ', this.props.lastSync)
        if (this.props.lastSync.length !== 0)
            this.props.syncData(this.props.lastSync)
        // else{
        //     alert('')
        // }
    }
    render() {
        if (this.props.loadDataIsProgress) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>
                        <CircularProgress thickness={7} size={50} />
                        <div>Loading....</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="App" style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ecf0f1'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <button className="btn"
                            onClick={this.syncData}
                            style={{
                                width: '15vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px',
                                marginLeft: '3vw'
                            }}>
                            Sync
                    </button>
                    </div>
                    <div style={{
                        width: '50vw',
                        height: '10%',
                        display: 'flex',
                        justifyContent: 'flex-end',

                    }}>
                        <button className="btn"
                            onClick={() => this.props.history.push('/products')}
                            style={{
                                width: '20vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px'
                            }}>
                            Products
                    </button>
                        <button className="btn"
                            onClick={() => this.props.history.push('/lockers')}
                            style={{
                                width: '20vw',
                                height: '50px',
                                backgroundColor: '#34495e',
                                color: '#ecf0f1',
                                border: '1px solid #ecf0f1',
                                marginTop: '10px',
                                borderRadius: '5px',
                                outline: 'none',
                                marginRight: '3vw',
                                cursor: 'pointer',
                                fontSize: '15px'
                            }}>
                            Lockers
                    </button>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%'
                }}>
                    <form onSubmit={this.onSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div>
                            <input
                                autoFocus
                                className="input"
                                placeholder={'Enter Your ID'}
                                style={{
                                    width: '30vw',
                                    height: '40px',
                                    fontSize: '20px',
                                    padding: '10px',
                                    color: '#2c3e50'
                                }}
                                value={this.state.userInput}
                                onChange={(e) => this.setState({ userInput: e.target.value })}
                                onKeyPress={this.keyPress} />
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

let mapStateToProps = (state) => {
    console.log(state);
    return {
        loadDataIsProgress: state.dbReducer.loadDataIsProgress,
        dataObj: state.dbReducer.dataObj,
        inventory: state.dbReducer.inventory,
        currentUser: state.dbReducer.currentUser,
        lockerHistory: state.dbReducer.lockerHistory,
        usersHistory: state.dbReducer.usersHistory,
        lastSync: state.dbReducer.lastSync
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => dispatch(DBActions.loadData()),
        setCurrentUser: (obj) => dispatch(DBActions.setCurrentUser(obj)),
        setDataObj: (obj) => dispatch(DBActions.setDataObj(obj)),
        setInventory: (obj) => dispatch(DBActions.setInventory(obj)),
        pushHistory: (obj) => dispatch(DBActions.pushHistory(obj)),
        syncData: (lastSync) => dispatch(DBActions.syncData(lastSync))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdScreen);