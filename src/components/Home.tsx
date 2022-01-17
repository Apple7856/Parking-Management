import { Button, Grid, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
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
        flexDirection: "column",
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
    bocContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
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

type DataState = {
    id: number,
    car: string,
    created_at: number
}

function getData() {
    if (localStorage.getItem('data')) {
        return JSON.parse(localStorage.getItem('data') || "")
    } else {
        return []
    }
}
const Home = () => {
    const classes = useStyle();
    const [carNumber, setCarNumber] = useState<string>("");
    const [store, setStore] = useState<Array<DataState>>(getData());
    const [updateStore, setUpdateStore] = useState(false);
    const [message, setMessage] = useState(false);
    const [payment, setPayment] = useState<number | null>(null);
    const [exitData, setExitData] = useState<DataState | any>(null);
    const [exit, setExit] = useState(false);
    const [user, setUser] = useState(false);
    const [hour, setHour] = useState<number>(0);
    const [amount, setAmount] = useState<number>(10)

    const addNewCar = () => {
        if (store.length < 5) {
            const newData: DataState = {
                id: store.length + 1,
                car: carNumber,
                created_at: new Date().getHours()
            }
            setUpdateStore(true);
            setStore([...store, newData]);
            setCarNumber("");
        } else {
            setMessage(true);
            setCarNumber("");
        }
    }

    function handleClick(x: number) {
        const newData = store.find((item) => {
            return item.id === x
        });
        const getCurrHour = new Date().getHours();
        setHour(getCurrHour);
        setExitData(newData);
        setUpdateStore(true);
        setExit(true);
        setUser(false);
    }

    function exitParking() {
        if (payment === amount) {
            const remove = store.filter((item) => {
                return item.id !== exitData.id
            });
            setStore(remove);
            setPayment(null);
            setExit(false);
        } else {
            setUser(true);
        }
    }

    useEffect(() => {
        if (updateStore) {
            if (hour - exitData.created_at < 2) {
                setAmount(10);
            } else {
                setAmount(((hour - exitData.created_at)-2) * 10 + 10);
            }
        }
        return () => {
            setUpdateStore(false);
        }
    }, [hour])

    useEffect(() => {
        if (updateStore) {
            localStorage.setItem('data', JSON.stringify(store));
        }
        return () => {
            setUpdateStore(false);
        }
    }, [store]);

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
            <Grid item xs={6} className={classes.left}>
                <Typography component='div' className={classes.newCar}>
                    <TextField id="standard-basic" label="Car Number" value={carNumber} onChange={(e) => setCarNumber(e.target.value.toUpperCase())} />
                    <Button variant="contained" color="primary" disabled={carNumber ? false : true} onClick={() => addNewCar()}>
                        Add Car
                    </Button>
                </Typography>
                {
                    message ?
                        <Typography component='div' className={classes.message}>
                            Parking is Full!
                        </Typography>
                        : ""
                }
            </Grid>
            <Grid item xs={6} className={classes.right}>
                <Typography component='div' className={classes.bocContainer}>
                    {
                        store.map((item, i) => {
                            return <Typography component='div' onClick={() => handleClick(item.id)} className={classes.box} key={i}>
                                {item.car}
                            </Typography>
                        })
                    }
                </Typography>
                {
                    exit ?
                        <Typography component='div' className={classes.payMoney}>
                            <Typography component="p">Please Submit Parking Fee - ${amount}</Typography>
                            <TextField type="number" id="standard-basic" className={classes.form} label="Car Number" value={payment} onChange={(e) => setPayment(parseInt(e.target.value))} />
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
        </Grid>
    )
}

export default Home
