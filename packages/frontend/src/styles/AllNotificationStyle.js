import {
    makeStyles,
    withStyles,
    TextField,
    Button,
    IconButton,
  } from "@material-ui/core";

  export const useStyles = makeStyles({
      page:{

      },
      sideColumn:{
        marginTop: 20,
        marginLeft: "5vw",
      },
      sideColumnContainer:{
        flexDirection: "column",
      },
      mainColumn:{
        marginTop: 20,
      },
      mainColumnContainer:{
        flexDirection: "column",
      },
      pageTitle:{
        color: "#868DA2",
        fontSize: 24,
        marginTop: 16,
     },
     controlBarContainer:{
      justifyContent: "space-between",
     },
     link:{
       marginTop: 10,
       color: "#1C67FF",
       fontSize: 16,
       textDecoration: "underline",
       "&:hover":{
         cursor: "pointer"
       },
     },
      searchIcon:{
         stroke: "#1C67FF",
         "&:hover":{
           cursor: "pointer"
         }
      },
      notListContainer:{
        flexDirection: "column",
        marginTop: 25,


      },
      singleNotItem:{
        height: 140,
        marginTop: 12,
        marginBottom:12,
        border: "1px solid #EDEFF3",
        borderRadius: 8,
        "&:hover":{
          cursor: "pointer"
        },
      },
      singleNotContainer:{
        // flexDirection: "column",
        height: "inherit"
      },
      iconItem:{
        height: "inherit",
      },
      iconContainer:{
        height: "inherit",
        justifyContent: "center",
        alignItems: "center"
      },
      contentItem:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },
      contentContainer:{
        // flexDirection: "column",
        // justifyContent:"center",
        height: "80%",
        borderLeft: "3px solid #EDEFF3",
        padding: 16,
      },
      notTopRow:{
        justifyContent: "space-between"
      },
      notType:{ 
        color: "#1C67FF",
        fontSize: 16,
        textTransform: "capitalize",
        fontWeight: "600"
      },
      notTime:{
        color: "#B8C3D8"
      },
      notTitle:{
        fontSize: 18,
      },
      notCategories:{
      color:  " #868DA2",
      fontSize: 16,
      }
      

  })