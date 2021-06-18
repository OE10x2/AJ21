import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const jikanjs = require('jikanjs');

const drawerWidth = 200;

const useStyles = theme => ({
    content: {
        marginLeft: drawerWidth,
    },
    paper: {
        width: 230,
        height: 400,
    },
});

class Main extends React.Component{
    state = {
        values: [],
    };

    async componentDidMount(){
        //First load the userList
        const userList = await jikanjs.loadUser('OE10x2', 'animelist');
        //Only need "anime" component from userList
        /*
        for (const element of userList.anime){
            if (element.mal_id !== 9379){
                this.setState({values: [...this.state.values, element]});
            }else{
                //Test if specific MAL ID can be recognized
                const tempAnime = await jikanjs.loadAnime(element.mal_id);
                //If so, load more information with "loadAnime" call with the ID
                this.setState({values: [...this.state.values, tempAnime]});
            }
        }
        */
       //SMALLER TEST CASE
        for (let i = 0; i < 10; i++){
            const element = userList.anime[i];
            if (element.mal_id !== 9379){
                this.setState({values: [...this.state.values, element]});
            }else{
                //Test if specific MAL ID can be recognized
                const tempAnime = await jikanjs.loadAnime(element.mal_id);
                //If so, load more information with "loadAnime" call with the ID
                this.setState({values: [...this.state.values, tempAnime]});
            }
        }
    }
  
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.content}>
                <ToolBar />
                <Typography variant="h5" className={classes.title}>NAMES</Typography>
                <Grid container direction="row" spacing={2}>
                    {this.state.values.map(value => (
                        <Grid item key={value.mal_id + " ITEM"} xs={6} sm={3}>
                            <Paper elevation={5} key={value.mal_id + " PAPER"} className={classes.paper}>
                                {value.title}
                                <img key={value.mal_id + " IMAGE"} src={value.image_url} alt="new"/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
            );
    }
}

export default withStyles(useStyles)(Main);