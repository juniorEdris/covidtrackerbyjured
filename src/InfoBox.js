import React from 'react'
import "./App.css";
import "./InfoBox.css";

import { Card, CardContent, Typography} from '@material-ui/core'

export default function InfoBox({ title,cases,total,isRed,active,isnotRed, ...props }) {
    return (
        
            <Card onClick={props.onClick} className={`infoBox ${active &&  'infoBox--selected'} ${isRed && 'infoBox--red'}   `}>
                <CardContent>
                    <Typography className='infoBox_title' color='textSecondary'>
                        {title}
                    </Typography>

                    <h2 className={`infoBox_cases ${isnotRed && 'infoBox_cases--green'}`}>{cases}</h2>

                    <Typography className='infoBox_total' color='textSecondary'>
                        {total} Total
                    </Typography>

                </CardContent>
            </Card>
            
        
    )
}
