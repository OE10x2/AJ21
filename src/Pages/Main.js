import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
const jikanjs = require('jikanjs');

const drawerWidth = 230;

const useStyles = () => ({
    root: {
        marginLeft: drawerWidth, //Move all content to avoid being hidden
    },
    content: {
        display: 'flex', //Formatting card
        borderRadius: '16px', //For card border roundness
        width: '500px', //Limit card size
        height: '300px', //Limit card size
        paddingTop: '16px', //Round border for image
        paddingBottom: '16px', //Round border for image
    },
    media: {
        minWidth: '233px', //For all images to have same size
        paddingBottom: '66.66%', //For matching card height
        borderRadius: '16px', //For image border roundness
        transform: 'translateY(-16px)', //Fixing image position
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
            this.setState({values: [...this.state.values, element]});
        }
        */
       //SMALLER TEST CASE
        for (let i = 0; i < 10; i++){
            const element = userList.anime[i];
            this.setState({values: [...this.state.values, element]});
        }
    }
  
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <ToolBar />
                <Grid container
                direction="row"
                spacing={2}
                >
                    {this.state.values.map(value => (
                        <Grid item
                        key={value.mal_id + " ITEM"}
                        xs={12} sm={6}
                        >
                            <Card
                            key={value.mal_id + " CARD"}
                            className={classes.content}
                            >
                                <CardMedia
                                image={value.image_url}
                                className={classes.media}
                                />
                                <CardContent>
                                    <Typography variant="body2">
                                        {value.mal_id}
                                    </Typography>
                                    <Typography color="primary" variant="h5">
                                        {value.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            );
    }
}

export default withStyles(useStyles)(Main);