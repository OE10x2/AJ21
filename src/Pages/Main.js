import React from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)', //Optional
    },
    media: {
        minWidth: '233px', //For all images to have same size
        paddingBottom: '66.66%', //For matching card height
        borderRadius: '16px', //For image border roundness
        transform: 'translateY(-16px)', //Fixing image position
    },
    nonMedia: {
        display: 'flex', //Essential
        flexDirection: 'column', //CardActions must align vertically with CardContent
        justifyContent: 'space-between', //Keep CardActions at bottom
    },
});

class Main extends React.Component{
    state = {
        values: [],
        length: -1, //Cannot be 0, as the array is empty initially as well
    };

    //For the onClick action for "Learn More" buttons
    handleLearnMore = (id) => this.props.history.push('/anime/' + id);

    async componentDidMount(){
        //First load the userList
        const userList = await jikanjs.loadUser('OE10x2', 'animelist');
        //Only need "anime" component from userList
        //First, pass in the length of userList
        this.setState({length: userList.anime.length});
        //Next, pass in all Objects in the array for "anime" component
        for (const e of userList.anime) this.setState({values: [...this.state.values, e]});
    }
  
    render(){
        const {classes} = this.props;

        if (this.state.values.length !== this.state.length){
            //Make sure all Objects are loaded from API
            return(
                <Typography variant="h3">Loading...</Typography>
            );
        }

        return(
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
                            <div className={classes.nonMedia}>
                                <CardContent>
                                    <Typography variant="body2">
                                        {value.mal_id}
                                    </Typography>
                                    <Typography color="primary" variant="h5">
                                        {value.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<MoreHorizIcon />}
                                    className={classes.button}
                                    onClick={() => this.handleLearnMore(value.mal_id)}
                                    >
                                        LEARN MORE
                                    </Button>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            );
    }
}

export default withRouter(withStyles(useStyles)(Main));