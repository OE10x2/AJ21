import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../App.css';
const jikanjs = require('jikanjs');

class Main extends React.Component{
    state = {
        values: [],
    };
    componentDidMount(){
        jikanjs.loadUser('OE10x2', 'animelist').then((response) => {
            response.anime.forEach(element => {
                this.setState({values: [...this.state.values, element.title]});
            })
        }).catch((err) => {
            console.error(err); // in case a error happens
        });
    }
    render(){
        return(
            <React.Fragment>
                <Typography variant="h1">TEST</Typography>
                {this.state.values.map((value) => (
                    <Typography key="value">{value}</Typography>
                ))}
            </React.Fragment>
        );
    }
}

export default Main;