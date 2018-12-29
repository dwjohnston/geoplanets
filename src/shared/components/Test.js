import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class SimpleSelect extends React.Component {
    state = {
        age: "",
        name: "hai",
        labelWidth: 0
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAlgoChange = event => {
        this.setState({
            selectedAlgo: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const items = ["ten", "twenty", "thirty"];
        const { selectedAlgo } = this.state;
        const algorithms = [
            {
                name: "algo 1",
                groups: [
                    {
                        icon: "PhoneIcon",
                        label: "Phone",
                        controls: [1, 2, 3]
                    },
                    {
                        icon: "FavoriteIcon",
                        label: "Favourite",
                        controls: [11, 12, 13]
                    }
                ]
            },
            {
                name: "algo 2",
                groups: [
                    {
                        icon: "PersonPinIcon",
                        label: "PersonPinIcon",
                        controls: [11, 22, 33]
                    },
                    {
                        icon: "PersonPinIcon",
                        label: "PersonPinIcon",
                        controls: [12, 22, 32]
                    }
                ]
            }
        ];
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Age</InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "age",
                            id: "age-simple"
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {items.map((v, i) => (
                            <MenuItem value={i} key={i}>
                                {" "}
                                {v}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    {/* <InputLabel htmlFor="algorithm-select">Algorithm</InputLabel> */}

                    <Select
                        value={selectedAlgo}
                        onChange={this.handleAlgoChange}
                        input={<Input name="Algorithm" id="algorithm-select" />}
                    >
                        {algorithms.map((v, i) => (
                            <MenuItem value={i} key={v.name}>
                                {v.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
