import React from 'react';
import { useEasybase } from 'easybase-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const jikanjs = require('jikanjs');

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
    const [open, setOpen] = useState(false);
    const [newItemID, setNewItemID] = useState("");
    const { db } = useEasybase();
    const classes = useStyles();

    const mounted = async() => {
        const ebData = await db('AJ21').return().all();
        setEasybaseData(ebData);
    }

    useEffect(() => {
        mounted();
    });

    const handleAddItemDialogOpen = () => setOpen(true);

    const handleAddItemDialogClose = () => setOpen(false);

    const handleAddItem = async() => {
        if (newItemID && Number.isInteger(parseInt(newItemID))){
            const anime = await jikanjs.loadAnime(parseInt(newItemID));
            console.log(anime.title);
            await db('AJ21').insert({
                malid: anime.mal_id,
                malscore: anime.score,
                titleeng: anime.title_english,
                episodes: anime.episodes,
                imageurl: anime.image_url,
            }).one();
            setOpen(false);
        }
    }
  
    return(
        <React.Fragment>
            <Button color="primary" onClick={handleAddItemDialogOpen}>ADD</Button>
            <Dialog open={open} onClose={handleAddItemDialogClose}>
                <DialogTitle>Add Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the MAL ID here to add an entry
                    </DialogContentText>
                    <TextField
                    autoFocus
                    label="ID"
                    fullWidth
                    onChange={e => setNewItemID(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddItem} color="primary">
                        Add Anime
                    </Button>
                    <Button onClick={handleAddItemDialogClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Divider />
            <br />
            <Grid container
            direction="row"
            spacing={2}
            >
                {easybaseData.map(value => (
                    <Grid item xs key={`${value.malid} ITEM`}>
                        <Card
                        key={`${value.malid} CARD`}
                        className={classes.content}
                        >
                            <CardMedia
                            image={value.imageurl}
                            className={classes.media}
                            />
                            <div className={classes.nonMedia}>
                                <CardContent>
                                {value.malid}
                                <h2 style={{ color: '#0051A5' }}>
                                    {value.titleeng}
                                    <br />
                                    ({value.titlechs})
                                </h2>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/anime/${value.malid}`}>
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
        </React.Fragment>
        );
  }