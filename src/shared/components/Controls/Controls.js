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
import Control from './Control';
import { changeAlgoAction } from '../../redux/actions/algoChange';
import randomParam from "./util/randomParam";
class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            selectedAlgo: 0,
        };

        this.randomAll();
    }


    randomAll = () => {
        this.props.algorithms[this.state.selectedAlgo].groups.forEach((algoGroup, i) => {
            algoGroup.controls.forEach(control => {
                this.props.updateParameter([algoGroup.id, control.id], randomParam(control));

            });
        });
    }

    handleParameterChange = (id, v) => {
        this.props.updateParameter([this.props.algorithms[this.state.selectedAlgo].groups[this.state.selectedTab - 1].id, ...id], v);
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

        this.props.updateSelectedAlgo(event.target.value);

    }

    renderTabContainer = (classes) => {


        const { selectedTab, selectedAlgo } = this.state;
        const { algorithms } = this.props;




        if (selectedTab === 0) return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="algorithm-select">Algorithm</InputLabel>

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
        else {


            const algo = algorithms[selectedAlgo];
            const tab = algo.groups[selectedTab - 1];


            return (<>
                {tab.controls.map(
                    (v, i) => <Control
                        key={`${i}-${tab.id}-${v.id}`}
                        value={v}
                        initValue={this.props.controlState[tab.id][v.id]}
                        onChange={this.handleParameterChange} />
                )
                }
            </>);
        }

        return (<span> nohthing </span >);
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
        controlState: state.controlState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSelectedAlgo: v => dispatch(changeAlgoAction(v)),
        updateParameter: (id, v) => dispatch(sliderUpdate(id, v))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Controls));
