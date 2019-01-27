import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Slider from "../Slider/Slider";
import { randomParam } from '../../../../util/random';
import xolor from "xolor";
class Rgba extends Component {
    constructor(props) {
        super(props);
        this.state = props.initialValue;
    }


    onChange = (id, v) => {
        console.log(id, v);
        console.log(this.state);

        this.setState({
            [id]: v
        }, () => {
            this.props.onChange([this.props.id], this.state);
        });

    }

    render() {

        console.log(this.props);

        console.log(this.state);
        console.log(xolor(Object.values(this.state)))
        console.log(xolor(this.state))
        console.log(xolor(this.state).css)
        const { value, classes } = this.props;
        return <Card elevation={2} className={classes.root}>

            {this.props.renderHint.map((v, i) => {
                return <Slider {...v} key={`${v.id}`} initialValue={this.state[v.id]} onChange={this.onChange} />
            })}

            <div style={{
                width: 100,
                height: 100,
                backgroundColor: xolor(Object.values(this.state)).css
            }} />

        </Card>;
    }
}

const styles = {
    root: {
        display: "flex",
        flexFlow: "row nowrap"
    },
};
export default withStyles(styles)(Rgba);
