import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {styles} from './material.style';

import {HeaderMenu} from './header-menu';
import './index.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  showSidebar = () => {
    this.setState(state => {
      return {isOpen: !state.isOpen};
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div className="header">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Travello
            </Typography>

            <HeaderMenu isOpen={this.state.isOpen} showSidebar={this.showSidebar} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

