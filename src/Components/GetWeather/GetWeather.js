import React, { useState } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 15,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
    flexGrow: 1,
    margin: "2rem auto",
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    "& > *": {
      margin: "auto",
      maxWidth: 650,
    },
  },
  section: {
    margin: "1rem 0 1rem 0",
  },
  leftMargin: {
    marginLeft: ".5rem",
  },
  bottomMargin: {
    marginBottom: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "black",
  },
  dividerMargin: {
    margin: "2rem 0",
  },
  weatherButton: {
    margin: "1rem",
  },
  tempSwitch: {
    margin: "2rem 0 1rem 0",
  },
}));

const GetWeather = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({ data: {} });
  const [expanded, setExpanded] = React.useState(false);
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: { q: location, days: 3 },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const returnWeather = async () => {
    await axios
      .request(options)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    returnWeather();
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(event) => handleSubmit(event)}
        align="center"
      >
        <Grid>
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
            className={classes.weatherButton}
          >
            Get Weather
          </Button>
        </Grid>
      </form>
      <div>
        {data.hasOwnProperty("location") && (
          <>
            <Card className={classes.root} key={data.location.localtime}>
              <Grid>
                <FormGroup>
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                      className={classes.tempSwitch}
                    >
                      <Grid item>&deg; C</Grid>
                      <Grid item>
                        <AntSwitch
                          checked={state.checked}
                          onChange={handleChange}
                          name="checked"
                        />
                      </Grid>
                      <Grid item>&deg; F</Grid>
                    </Grid>
                  </Typography>
                </FormGroup>
              </Grid>
              <CardHeader
                title={data.location.name}
                subheader={data.location.region}
              />
              <CardContent>
                <Typography variant="h3" color="textPrimary" component="h3">
                  Current Temperature:{" "}
                  {state.checked
                    ? `${data.current.temp_f} F`
                    : `${data.current.temp_c} C`}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  component="p"
                  className={classes.leftMargin}
                >
                  View 3-Day Forecast
                </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div>
                    {data.forecast.forecastday.map((day, index) => (
                      <>
                        <div key={index}>
                          <h2>{day.date}:</h2>
                          <h3>
                            High:{" "}
                            {state.checked
                              ? `${day.day.maxtemp_f} F`
                              : `${day.day.maxtemp_c} C`}
                          </h3>
                          <h3>
                            Low:{" "}
                            {state.checked
                              ? `${day.day.mintemp_f} F`
                              : `${day.day.mintemp_c} C`}
                          </h3>
                          <div>
                            <h3>Hourly Forecast:</h3>
                            <Grid container spacing={2}>
                              {day.hour.map((hour, index) => (
                                <>
                                  <Grid item sm={2} key={index}>
                                    <Paper className={classes.paper}>
                                      <p>{hour.time.slice(11)}</p>
                                      <p>
                                        {state.checked
                                          ? `${hour.temp_f} F`
                                          : `${hour.temp_c} C`}
                                      </p>
                                    </Paper>
                                  </Grid>
                                </>
                              ))}
                            </Grid>
                          </div>
                          {index < 2 && (
                            <Divider className={classes.dividerMargin} />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </CardContent>
              </Collapse>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default GetWeather;
