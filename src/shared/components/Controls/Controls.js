import React, {
    Component, Fragment,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


import { connect } from 'react-redux';
import { sliderUpdate } from '../../redux/actions/sliderChange';
import { AppBar, Tabs, Tab, Select, InputLabel, MenuItem, FormControl, Input } from '@material-ui/core';
import DynamicIcon from "../generic/DynamicIcon";
import NoSSR from "react-no-ssr"
import SettingsIcon from "@material-ui/icons/Settings";
class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            selectedAlgo: 0,
        };
    }

    handleTabChange = (event, value) => {
        this.setState({
            selectedTab: value
        });
    }

    handleAlgoChange = (event) => {
        this.setState({
            selectedAlgo: event.target.value
        });
    }

    renderTabContainer = (classes) => {


        const { selectedTab, selectedAlgo } = this.state;
        const { algorithms } = this.props;

        if (selectedTab === 0) return (
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="algorithm-select">Algorithm</InputLabel> */}

                <Select
                    value={selectedAlgo}
                    onChange={this.handleAlgoChange}
                    input={<Input name="Algorithm" id="algorithm-select" />}

                >
                    {algorithms.map((v, i) => (
                        <MenuItem
                            value={i}
                            key={v.name}>
                            {v.name}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
        )

        return (<span> nohthing </span>);
    }

    // handleChange = (e, v) => {
    //     this.setState({
    //         value: v
    //     });
    //     this.props.sliderUpdate("slider", v)
    // }
    render() {

        const { classes, algorithms } = this.props;
        const { selectedTab, selectedAlgo } = this.state;

        return <div className={classes.root}>
            <NoSSR>

                <AppBar position="static" color="inherit">
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Settings" icon={<SettingsIcon />} />
                        {algorithms[selectedAlgo].groups.map((v, i) => (<Tab
                            label={v.label}
                            key={`${i}-${v.label}`}
                            icon={<DynamicIcon name={v.icon} />}
                        />
                        ))}
                    </Tabs>
                </AppBar>
                <div className={classes.tabContainer}>
                    {this.renderTabContainer(classes)}
                </div>
            </NoSSR>

        </div>;
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: "column nowrap",
        alignItems: "stretch",
        height: 300,
        color: "black",
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 220,
        height: "200px",
    },
    tabContainer: {
        flex: "1 0 auto",
        display: "flex",
        flexFlow: "row nowrap",
    }
});


const mapStateToProps = (
    state,
    ownProps
) => {
    return {

        algorithms: [
            {
                name: "algo 1",
                groups: [
                    {
                        icon: "phone",
                        label: "Phone",
                        controls: [
                            1, 2, 3
                        ]
                    },
                    {
                        icon: "phone",
                        label: "Favourite",
                        controls: [
                            11, 12, 13
                        ]
                    }
                ]
            },
            {
                name: "algo 2",
                groups: [
                    {
                        icon: "phone",
                        label: "PersonPinIcon",
                        controls: [
                            11, 22, 33
                        ]
                    },
                    {
                        icon: "settings",
                        label: "PersonPinIcon",
                        controls: [
                            12, 22, 32
                        ]
                    }
                ]
            }
        ]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sliderUpdate: (n, v) => dispatch(sliderUpdate(n, v))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Controls));
