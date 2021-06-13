import React from 'react';
import Typography from '@material-ui/core/Typography';
const jikanjs = require('jikanjs');

class Main extends React.Component{
    state = {
        values: [],
    };
    async componentDidMount(){
        //First load the userList
        const userList = await jikanjs.loadUser('OE10x2', 'animelist');
        //Only need "anime" component from userList
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
    }
    render(){
        return(
            <React.Fragment>
                <Typography variant="h1">TEST</Typography>
                {this.state.values.map((value) => (
                    //For "variant", just a test to see if the output is different
                    <Typography key={value.mal_id} variant={value.mal_id !== 9379 ? "h5" : "body1"}>
                        {/*To see if the result is different, output the synopsis for 9379*/}
                        {value.mal_id !== 9379 ? value.title : value.synopsis}
                    </Typography>
                ))}
            </React.Fragment>
        );
    }
}

export default Main;