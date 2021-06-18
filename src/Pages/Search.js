import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const jikanjs = require('jikanjs');

const useStyles = theme => ({
    root: {
        margin: 'auto',
        borderRadius: theme.spacing(2), //16px
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 500,
        maxHeight: 300,
        marginLeft: 'auto',
        overflow: 'initial',
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        flexDirection: 'row',
    },
    media: {
        width: '88%',
        paddingBottom: '66.66%',
        borderRadius: theme.spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        transform: 'translateX(-8px)',
    },
    button: {
        backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
        boxShadow: '0px 4px 32px rgba(252, 56, 56, 0.4)',
        borderRadius: 100,
        paddingLeft: 24,
        paddingRight: 24,
        color: '#ffffff'
    },
});

class Search extends React.Component{
    state = {
        values: [],
    };
    async componentDidMount(){
        const anime42938 = await jikanjs.loadAnime(42938);
        this.setState({values: anime42938});
    }
    render(){
        const {classes} = this.props;
        return(
            <React.Fragment>
                <ToolBar />
                <Card className={classes.root}>
                    <CardMedia
                    className={classes.media}
                    image={this.state.values.image_url}
                    />
                    <CardContent>
                        <Typography variant="body2">
                        {this.state.values.mal_id}
                        </Typography>
                        <Typography color="primary" variant="h5">
                        {this.state.values.title}
                        </Typography>
                        <br />
                        <Typography paragraph>{this.state.values.score} - {this.state.values.scored_by}</Typography>
                        <Typography paragraph>{this.state.values.broadcast}</Typography>
                        <Typography paragraph>{this.state.values.status}</Typography>
                        <Button className={classes.button}>Read more</Button>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}
    
export default withStyles(useStyles)(Search);