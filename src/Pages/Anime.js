import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const jikanjs = require('jikanjs');

const drawerWidth = 230;

const useStyles = () => ({
    root: {
        marginLeft: drawerWidth, //Move all content to avoid being hidden
    },
});

class Anime extends React.Component{
    state = {
        general: {},
        stats: {},
    };

    async componentDidMount(){
        //First load the userList
        const general = await jikanjs.loadAnime(this.props.match.params.id);
        const stats = await jikanjs.loadAnime(this.props.match.params.id, 'stats');
        this.setState({general: general});
        this.setState({stats: stats});
    }

    render(){
        if (!this.state.general.aired || !this.state.stats.scores){
            //Objects not finished loading yet
            return(
                <Typography variant="h3">Loading...</Typography>
            )
        }
        
        return(
            <React.Fragment>
                <Typography>{this.state.general.title}</Typography>
                <Typography paragraph>
                    {this.state.general.synopsis}
                </Typography>
                <Typography color="primary">
                    {this.state.stats.scores["1"].votes}
                </Typography>
                {this.state.general.aired.string}
            </React.Fragment>
        );
    }
}
    
export default withStyles(useStyles)(Anime);