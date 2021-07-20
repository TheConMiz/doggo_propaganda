import React, { useState, useEffect, Fragment } from 'react'

import { Card, IconButton, makeStyles } from "@material-ui/core"

// import { CheckIcon, ClearIcon } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check';

import ClearIcon from '@material-ui/icons/Clear';


export const App = () => {

    const styles = useStyles();

    const [dogs, setDogs] = useState([]);

    const [currentDog, setCurrentDog] = useState(0);

    const [likedDogs, setLikedDogs] = useState([]);

    const [dislikedDogs, setDislikedDogs] = useState([]);


    function getDogBatch() {
        
        const url = "https://api.thedogapi.com/v1/images/search";
        const method = "GET";
        const apiKey = "169c903c-25f9-407c-939f-ccc26574a4bf";

        fetch(url, {
            method: method,
            api_key: apiKey,
            limit: "5",
        })

            .then(response => response.json())
            
            .then(response => {
                console.log(response)
                setDogs(response)
            });
        
        // setRetrieveDogData(false);
    }
    // get list of breeds, and randomly get dogs from each of the breeds
    // setRetrieveDogData(true);

    useEffect(getDogBatch, []);

    function logPreference(preferred) {
        //todo: get dog object and push it
        if (preferred) {
            let newPref = likedDogs.slice();

            newPref.push();

            setLikedDogs(newPref);
        }

        else {
            let newPref = dislikedDogs.slice();

            newPref.push();

            setDislikedDogs(newPref);

            if (dogs.length >= currentDog) {
                
                let newCurrentDog = currentDog + 1

                setCurrentDog(newCurrentDog);                
            }

        }
    }
    
    return (
        <div className={styles.root}>
            
            <Card className={styles.card} raised>
                <div className={styles.image}>
                    <img
                        src={
                            dogs.length !== 0 ? dogs[currentDog].url : ""
                        }
                        className={styles.image}
                        alt="unknown"
                    >
                        
                    </img>
                </div>

                <div className={styles.responseBar}>

                    <IconButton
                        onClick={()=> logPreference(true)}
                    >
                        <CheckIcon/>
                    </IconButton>
                
                    <IconButton
                        onClick={()=> logPreference(false)}

                    >
                        <ClearIcon/>
                    </IconButton>
                
                </div>
            

            
            </Card>



        </div>
    )
}

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: "100vh",
        padding: '0 30px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        height: "50vh",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    responseBar: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    image: {
        height: "95%",
        width: "100%"
    }
});

