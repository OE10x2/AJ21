import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';
const jikanjs = require('jikanjs');

const useStyles = () => ({
    
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
        if (!this.state.general.aired){
            //Objects not finished loading yet
            return <LinearProgress />;
        }
        
        return(
            <React.Fragment>
                <Link to="/">
                    <IconButton color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                
                <Typography variant="h5">{this.state.general.title}</Typography>
                <Typography variant="h6" color="primary">{this.state.general.score}</Typography>
                <Typography paragraph>
                    {this.state.general.synopsis}
                </Typography>
                <Typography color="primary">
                    {this.state.stats.scores["1"].votes} {this.state.general.aired.string}
                </Typography>
                <img
                src={this.state.general.image_url}
                alt={this.state.general.mal_id}
                />
            </React.Fragment>
        );
    }
}
    
export default withStyles(useStyles)(Anime);