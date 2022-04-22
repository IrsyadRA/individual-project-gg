import {Alert} from '@mui/material'

const AlertNotif = ({severity, text})=>{
    <Alert severity={severity}>{text}</Alert>
}

export default AlertNotif;