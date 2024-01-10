import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({name,label,type,handleChange,autoFocus,half,handleShowPassword,fullWidth,seventy}) => {
  const  inpuWidth=seventy?'70%':'100%';
  return (
    <Grid  item xs={12} sm={half?6:12}>
       <TextField
       name={name}
       onChange={handleChange}
       variant="outlined"
       required
       label={label}
       autoFocus={autoFocus}
       type={type}
       style={{width:inpuWidth,marginLeft:"15%"}}
       InputProps={name=='password' && {
        endAdornment:(
            <InputAdornment position='end'>
               <IconButton onClick={handleShowPassword}>
                {type=='password' ?<Visibility/>:<VisibilityOff/>}
                </IconButton>  
            </InputAdornment>
        )
       }}
       />
    </Grid>
  )
}

export default Input
