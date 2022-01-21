import { Box, Button, Card, CardActions, CardContent, Grid, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyle = makeStyles((theme) => ({
    grid: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: "row",
    },
    left: {
        backgroundColor: theme.palette.success.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    newCar: {
        width: "80%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around"
    },
    right: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        width: "50px",
        height: "50px",
        backgroundColor: "yellow",
        borderRadius: "4px",
        margin: theme.spacing(2),
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    message: {
        width: "300px",
        height: "80px",
        margin: theme.spacing(5),
        backgroundColor: "yellow",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        margin: theme.spacing(1),
    },
    payMoney: {
        width: "400px",
        height: "200px",
        backgroundColor: "yellow",
        borderRadius: "5px",
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        marginTop: theme.spacing(2),
    },
    incorrect: {
        color: "red",
        fontSize: "12px",
    }
}))

const Home = () => {
    const classes = useStyle();
    const [carNumber, setCarNumber] = useState<string>("");
    const [slot, setSlot] = useState<any>(null);
    const [hideSlot, setHideSlot] = useState<boolean>(true);
    const [numberOfParkingSlot, setNumberOfParkingSlot] = useState<Array<number>>([]);
    const [blankSpace, setBlankSpace] = useState<Array<number>>([]);
    const [storeSpace, setstoreSpace] = useState<Array<number>>([]);
    const [message, setMessage] = useState(false);
    const [payment, setPayment] = useState<number | null>(null);
    const [amountPopup, setAmountPopup] = useState<boolean>(false);
    const [exit, setExit] = useState(false);
    const [id, setId] = useState<any>(null);
    const [user, setUser] = useState(false);
    const [hour, setHour] = useState<any>(null);
    const [amount, setAmount] = useState<number>(10)

    const addNewCar = () => {
        if (blankSpace.length > 0) {
            const getRandomValue = Math.floor(Math.random() * blankSpace.length);
            const text: any = document.getElementById(`carCard${blankSpace[getRandomValue]}`);
            text.innerHTML = carNumber;
            console.log(blankSpace);
            console.log(storeSpace);
            const newBlankValue = blankSpace.filter((item) => {
                return item !== blankSpace[getRandomValue]
            })
            setstoreSpace((storeSpace) => [...storeSpace, blankSpace[getRandomValue]]);
            setBlankSpace(newBlankValue);
            setCarNumber("");
        } else {
            setMessage(true);
            setCarNumber("");
        }
    }

    const slotArray: number[] = [];

    function addNewSlot() {
        setHideSlot(false);
        let i: any = 0;
        while (i < slot) {
            slotArray.push(i);
            i++;
        }
        setNumberOfParkingSlot(slotArray);
        setBlankSpace(slotArray);
    }

    function handleClick(x: number) {
        if (document.getElementById(`carCard${x}`)?.innerHTML) {
            setAmountPopup(true);
            setId(x);
        }
    }

    function getTotalHour() {
        setAmount(hour > 2 ? (hour - 1) * 10 : 10);
        setAmountPopup(false);
        setExit(true);
        setHour(null);
    }

    function exitParking() {
        if (payment === amount) {
            const text: any = document.getElementById(`carCard${numberOfParkingSlot[id]}`);
            text.innerHTML = "";
            console.log(storeSpace);
            const newStoreSpace = storeSpace.filter((item) => {
                return item !== numberOfParkingSlot[id]
            })
            setBlankSpace((blankSpace) => [...blankSpace, numberOfParkingSlot[id]]);
            setstoreSpace(newStoreSpace);
            setPayment(null);
            setExit(false);
        } else {
            setUser(true);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(false);
        }, 5000);
        return () => {
            clearTimeout(timer);
        }
    }, [message])

    return (
        <Grid container className={classes.grid}>
            <Grid item xs={3} className={classes.left}>
                {
                    hideSlot ?
                        <Typography component='div' className={classes.newCar}>
                            <TextField type="number" id="standard-basic" label="Create Parking Slot" value={slot} onChange={(e) => setSlot(parseInt(e.target.value))} />
                            <Button variant="contained" color="primary" disabled={slot ? false : true} onClick={() => addNewSlot()}>
                                Create Slot
                            </Button>
                        </Typography>
                        :
                        <Typography component='div' className={classes.newCar}>
                            <TextField id="standard-basic" label="Enter Car Number" value={carNumber} onChange={(e) => setCarNumber(e.target.value.toUpperCase())} />
                            <Button variant="contained" color="primary" disabled={carNumber ? false : true} onClick={() => addNewCar()}>
                                Add Car
                            </Button>
                        </Typography>
                }
                {
                    message ?
                        <Typography component='div' className={classes.message}>
                            Parking is Full!
                        </Typography>
                        : ""
                }
                {
                    amountPopup ?
                        <Typography component='div' className={classes.payMoney}>
                            <Typography component="p">Please Enter Total Hours</Typography>
                            <TextField type="number" id="standard-basic" className={classes.form} label="Total Hours" value={hour} onChange={(e) => setHour(parseInt(e.target.value))} />
                            <Button variant="contained" className={classes.form} color="primary" disabled={hour ? false : true} onClick={() => getTotalHour()}>
                                Count Hour
                            </Button>
                        </Typography>
                        : ""
                }
                {exit ?
                    <Typography component='div' className={classes.payMoney}>
                        <Typography component="p">Please Submit Parking Fee - ${amount}</Typography>
                        <TextField type="number" id="standard-basic" className={classes.form} label="Enter Your Amount" value={payment} onChange={(e) => setPayment(parseInt(e.target.value))} />
                        {
                            user ? <Typography component="p" className={classes.incorrect}>Please Submit the correct amount!</Typography> : ""
                        }
                        <Button variant="contained" className={classes.form} color="primary" disabled={payment ? false : true} onClick={() => exitParking()}>
                            Submit Payment
                        </Button>
                    </Typography>
                    : ""
                }
            </Grid>
            <Grid item xs={9} className={classes.right}>
                {
                    numberOfParkingSlot.map((item, i) => {
                        return <Card variant="outlined" key={i} className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    PARKING_ID0{i + 1}
                                </Typography>
                                <Typography color="textSecondary" id={`carCard${i}`}>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleClick(item)}>Exit</Button>
                            </CardActions>
                        </Card>
                    })
                }

            </Grid>
        </Grid>
    )
}

export default Home
