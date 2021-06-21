import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
        this.setState({general: general, stats: stats});
    }

    render(){
        if (!this.state.general.aired || !this.state.stats.scores){
            //Objects not finished loading yet
            return(
                <React.Fragment>
                    <Typography variant="h3">Loading...</Typography>
                    <Typography paragraph>
                        Please allow up to 5 seconds for the content to load.
                    </Typography>
                </React.Fragment>
            )
        }
        
        return(
            <React.Fragment>
                <Link to="/">
                    <IconButton color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                
                <Typography>{this.state.general.title}</Typography>
                <img
                src={this.state.general.image_url}
                alt={this.state.general.mal_id}
                />
                <Typography paragraph>
                    {this.state.general.synopsis}
                </Typography>
                <Typography color="primary">
                    {this.state.stats.scores["1"].votes} {this.state.general.aired.string}
                </Typography>
            </React.Fragment>
        );
    }
}
    
export default withStyles(useStyles)(Anime);