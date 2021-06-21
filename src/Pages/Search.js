import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = () => ({
    
});

class Search extends React.Component{
    state = {
        values: [],
    };

    async componentDidMount(){
        
    }

    render(){
        //const {classes} = this.props;
        return(
            <React.Fragment>
                <Typography align="center" variant="h4">Search Bar</Typography>
                <Divider />
                <br />
                <TextField
                fullWidth
                color="primary"
                variant="outlined"
                label="Search Animes"
                />
            </React.Fragment>
        );
    }
}
    
export default withStyles(useStyles)(Search);