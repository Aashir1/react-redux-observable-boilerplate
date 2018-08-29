import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from 'react-redux';


class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            selectedBranch: ''
        };
    }
    toggleDrawer = () => {
        this.setState({ openDrawer: !this.state.openDrawer });
    }
    render() {
        return (
            <div>
                <AppBar position="static" style={{ backgroundColor: "#d5d5d5" }}>
                    <Toolbar style={{ display: "flex", flex: 1, justifyContent: 'space-between' }} >
                        <div style={{
                            display: 'flex',
                            flex: '1',
                            justifyContent: 'flex-end',
                        }}>
                            <div style={{
                                marginRight: '16px'
                            }}>
                                <p>{this.props.name}</p>
                            </div>
                            <div>
                            {
                                this.props.imageUrl ? 
                                <img src={this.props.imageUrl} width="50" height="50" style={{borderRadius: '50px'}} />
                                : 
                                <img src={require(`./profileImage.jpg`)} width="50" height="50" style={{borderRadius: '50px'}} />
                            }
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div >
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
    };
};
const mapStateToProps = state => {
    console.log('state from Appbar: ', state);
    return {
        state: state.dbReducer
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Appbar);