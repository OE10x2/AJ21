import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
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
}));

export const Search = React.memo(function BlogCard() {
  const styles = useStyles();
  return (
      <React.Fragment>
          <ToolBar />
          <Card className={styles.root}>
            <CardMedia
                className={styles.media}
                image={
                'https://cdn.myanimelist.net/images/anime/1146/113477.jpg?s=a951a4b3372f985a2f472ac7286d7972'
                }
            />
            <CardContent>
                <Typography variant="body2">
                    40938
                </Typography>
                <Typography color="primary" variant="h5">
                    Hige wo Soru. Soshite Joshikousei wo Hirou.
                </Typography>
                <br />
                <Typography paragraph>Score: 7.66</Typography>
                <Typography paragraph>Mondays at 22:30 (JST)</Typography>
                <Typography paragraph>Currently Airing</Typography>
                <Button className={styles.button}>Read more</Button>
            </CardContent>
            </Card>
      </React.Fragment>
  );
});

export default Search;