import React, {Component} from 'react';
import {Link} from 'react-router';
import {AppBar, Drawer, MenuItem, Divider} from 'material-ui';
import {RightMenu} from './RightMenu';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export class NavAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }
    
    handleClose(){
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <AppBar title={<span>Fonoteka</span>}
                    titleStyle={{
                    color: '#F44336',
                    fontSize: 30
                    }}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={<RightMenu/>}/>
                <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem containerElement={<Link to="/"/>} onTouchTap={this.handleClose}>Aktualności</MenuItem>
                    <MenuItem containerElement={<Link to="/base"/>} onTouchTap={this.handleClose}>Baza</MenuItem>
                    <MenuItem containerElement={<Link to="/ranking"/>} onTouchTap={this.handleClose}>Ranking</MenuItem>
                    <Divider />
                    <MenuItem containerElement={<Link to="/friends"/>} onTouchTap={this.handleClose}>Znajomi</MenuItem>
                    <MenuItem containerElement={<Link to="/messages"/>} onTouchTap={this.handleClose}>Wiadomości</MenuItem>
                    <MenuItem containerElement={<Link to="/events"/>} onTouchTap={this.handleClose}>Wydarzenia</MenuItem>
                    <Divider />
                    <MenuItem containerElement={<Link to="/settings"/>} onTouchTap={this.handleClose}>Ustawienia</MenuItem>
                </Drawer>
            </div>
        );
    }
}