import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
const jikanjs = require('jikanjs');

const drawerWidth = 200;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  image: {
      border: '2px solid #555',
      width: '100px',
      height: 'auto',
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
            <div className={classes.root}>
                <main className={classes.content}>
                    <ToolBar />
                    <Box display="flex">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" className={classes.title}>NAMES</Typography>
                            <List>
                                {this.state.values.map((value) => (
                                    <Paper elevation={5} className={classes.paper} key={value.mal_id + " PAPER"}>
                                        <ListItem key={value.mal_id + " ITEM"}>
                                            <ListItemText
                                                primary={
                                                    <Typography color="primary" variant="body1">
                                                        {value.title}
                                                    </Typography>
                                                }
                                                secondary={value.mal_id}
                                            />
                                            <img key={value.mal_id + " IMAGE"} src={value.image_url} alt="new" className={classes.image}/>
                                        </ListItem>
                                    </Paper>
                                ))}
                            </List>
                        </Grid>
                    </Box>
                </main>
            </div>
            );
    }
}

export default withStyles(useStyles)(Main);