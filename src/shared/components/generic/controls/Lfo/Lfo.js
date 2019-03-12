import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Slider from "../Slider/Slider";
import { randomParam } from '../../../../util/random';
import xolor from "xolor";
class Lfo extends Component {
    constructor(props) {
        super(props);
        this.state = props.initialValue;
    }


    onChange = (id, v) => {
        this.setState({
            [id]: v
        }, () => {
            this.props.onChange([this.props.id], this.state);
        });

    }

    render() {

        const { value, classes } = this.props;
        return <Card elevation={2} className={classes.root}>
            {this.props.renderHint.map((v, i) => {
                return <Slider {...v} key={`${v.id}`} initialValue={this.state[v.id]} onChange={this.onChange} />
            })}
        </Card>;
    }
}

const styles = {
    root: {
        display: "flex",
        flexFlow: "row nowrap"
    },
};
export default withStyles(styles)(Lfo);
