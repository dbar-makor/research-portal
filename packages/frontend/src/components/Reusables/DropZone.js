import React from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import { useStyles } from '../../styles/AuthorsStyles'
import { DeleteButton} from '../../styles/MainStyles'
import { ReactComponent as ImageIcon} from '../../assets/icons/iconImage.svg'
import ClearIcon from '@material-ui/icons/Clear';
import { useDropzone } from 'react-dropzone';


function DropZone(props) {
    const classes = useStyles()
    const {onDrop, uploadedImage, setUploadedImage, purpose = 'cover image*', fileOK, setFileOK, fileTypes, multi
        } = props
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: fileTypes })
    

    return (
        <Grid
        container
        justifyContent='center'
        {...getRootProps()}
        className={classes.uploadImage}
      >
        <Grid item xs={12}>
          <input
            {...getInputProps()}
          />
          <label htmlFor='coverImg'>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                cursor: 'pointer'
              }}
            >
              <ImageIcon style={{ width: '26px' }}/>
            </Grid>
          </label>
        </Grid>
        {isDragActive ? (
            <Typography>Drop the file here ...</Typography>
          ) : (
            uploadedImage ?
             (
            
            <Grid item xs={12}>
              <Grid container justifyContent='center' alignItems='center'>
                <Typography className={classes.uploadText} style={{ marginRight: '10px'}}>
                  {typeof uploadedImage === 'string' ? (uploadedImage.length > 20 ? `${uploadedImage.slice(0, 20)}...` : uploadedImage) : (uploadedImage.file_name?.length > 20 ? `${uploadedImage.file_name.slice(0, 20)}...` : uploadedImage.file_name)}
                </Typography>
                <DeleteButton
                    disableRipple
                    onClick={() => { 
                         setUploadedImage(typeof uploadedImage === 'string' ? '' : null)
                         setFileOK && setFileOK({initial: false, final: false});
                        }
                      
                      }
                  >
                    <ClearIcon className={classes.clearIcon}/>
                  </DeleteButton>
              </Grid>
            </Grid>)
            :
            (<>
        <Grid item xs={12}>
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography className={classes.uploadLink}>
                Upload
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.uploadText}>
              &nbsp;{purpose}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography className={classes.onlyPng}>
              .jpg, .png, .svg .jfif .webp
            </Typography>
            </Grid>            
          </Grid>
        </Grid>
        </>))}
      </Grid>
    )
}

export default DropZone
