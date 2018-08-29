import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../Components/Navbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
class Products extends Component {
    constructor(props) {
        super(props);
        this.inventoryArray = [];
        let { dataObj, inventory, currentUser } = this.props;
        for (let i in inventory) {
            console.log(i);
            console.log('inventory[i]: ', inventory[i]);
            this.inventoryArray.push({ key: i, data: inventory[i] });
        }
        this.state = {
            inventoryArray: this.inventoryArray,
            currentUser: currentUser,
            productName: '',
            consumeable: 'none',
            productQty: '',
            productId: ''
        }
    }
    addProduct = () => {
        let { productName, consumeable, productQty, inventoryArray, productId } = this.state;
        let { dataObj, inventory, currentUser } = this.props;
        let flag = false;
        // console.log('productName : ', productName);
        // console.log('productId : ', productId);
        // console.log('consumeable : ', consumeable);
        // console.log('flag : ', productName.trim() !== "" && productQty.trim() !== "" && (typeof consumeable === 'boolean') && productId > 0);
        if (productName.trim() !== "" && productQty.trim() !== "" && (typeof consumeable === 'boolean') && productId > 0) {
            let inventoryKeyArray = Object.keys(inventory);
            for (let i in inventory) {
                productName = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
                if (inventory[i].name == productName) {
                    inventory[i].qty += parseInt(productQty);
                    this.props.setInventory(inventory);
                    this.props.setDataObj(dataObj);
                    flag = true;
                    break;
                }
            }
            if (!flag && dataObj[productId] == undefined) {
                productName = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
                console.log('product Name', productName);
                inventory[productId] = { type: 'product', rfid_tag: productId, name: productName, qty: parseInt(productQty), consumeable };
                dataObj[productId] = { type: 'product', rfid_tag: productId, name: productName, qty: parseInt(productQty), consumeable };
                inventoryArray = [...inventoryArray, { key: productId, data: { type: 'product', rfid_tag: productId, name: productName, qty: parseInt(productQty), consumeable } }]
                this.props.setInventory(inventory);
                this.props.setDataObj(dataObj);
            }
            this.setState({ productId: '', productName: '', consumeable: '', productQty: '', inventoryArray }, () => {
            });
        } else {
            alert('Data Badly formated or already exist')
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        let { dataObj, inventory, currentUser } = this.props;
        console.log('this.state.inventoryArray: ', this.state.inventoryArray);
        return (
            <Navbar style={styles.tableParent} history={this.props.history} name={currentUser ? this.state.currentUser.name : 'UserName'} imageUrl={currentUser ? this.state.currentUser.imageUrl : null}>
                <div style={styles.tableParent}>
                    <div>
                        <div>
                            <TextField
                                label="Product Name"
                                value={this.state.productName}
                                onChange={(text) => this.setState({ productName: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Product ID"
                                type="number"
                                value={this.state.productId}
                                onChange={(text) => this.setState({ productId: text.target.value })}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Quantity"
                                value={this.state.productQty}
                                onChange={(text) => this.setState({ productQty: text.target.value })}                            // onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>
                        <div >
                            <Select
                                style={{ width: '100%' }}
                                name='consumeable'
                                value={this.state.consumeable}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'consumeable',
                                }}
                            >
                                <MenuItem value="none">
                                    <em>Select Branch</em>
                                </MenuItem>
                                <MenuItem key={1} value={true}>True</MenuItem>
                                <MenuItem key={2} value={false}>False</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <Button onClick={this.addProduct} variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
                                Add Product
                            </Button>
                        </div>
                    </div>

                    <h1 style={{ color: '#34495e' }}>Products</h1>
                    {
                        this.state.inventoryArray.length > 0 ?
                            <div style={styles.tableDiv}>
                                <h2>Products</h2>
                                <h2>Quantity</h2>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.inventoryArray.map((dataObj, i) => {
                            let { data, key } = dataObj;
                            if (data)
                                return (
                                    <div key={key} style={{
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);