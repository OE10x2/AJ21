import { useEasybase } from 'easybase-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles({
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

export default function AJ() {
    const [easybaseData, setEasybaseData] = useState([]);
    const { db } = useEasybase();
    const classes = useStyles();

    const mounted = async() => {
        const ebData = await db("AJ21").return().all();
        setEasybaseData(ebData);
    }

    useEffect(() => {
        mounted();
    });
  
    return(
        <Grid container
        direction="row"
        spacing={2}
        >
            {easybaseData.map(value => (
                <Grid item xs key={`${value.id} ITEM`}>
                    <Card
                    key={`${value.id} CARD`}
                    className={classes.content}
                    >
                        <CardMedia
                        image={value.url}
                        className={classes.media}
                        />
                        <div className={classes.nonMedia}>
                            <CardContent>
                            {value.id}
                            <h2 style={{ color: '#0051A5' }}>
                                {value.chs}
                            </h2>
                            </CardContent>
                            <CardActions>
                                <Link to={`/anime/${value.id}`}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<MoreHorizIcon />}
                                    >
                                        LEARN MORE
                                    </Button>
                                </Link>
                            </CardActions>
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
        );
  }