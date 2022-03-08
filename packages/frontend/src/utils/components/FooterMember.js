import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as MakorIcon } from "../../assets/icons/makorLogo.svg";
import { useSelector } from "react-redux";
import { useStyles } from "../../styles/MainStyles";
import WorldMap from "../../components/Members/WorldMap";

export default function FooterMember() {
  const userCategories = useSelector(
    (state) => state.auth.userContent.categories
  );
  const classes = useStyles();
  return (
    <footer className={classes.memberFooter}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 2, sm: 2 }}
        bgcolor="black"
        color="white"
        style={{height: "inherit"}}
      >
        {/* px={{ xs: 3, sm: 10 }} py={{ xs: 2, sm: 2 }} */}
        <Container maxWidth="lg" className={classes.memberFooterContainer}>
          <Grid container style={{height: "inherit"}}>
            <Grid item xs={12} sm={2}>
              <Grid container>
                <Grid item>
                  <Box style={{ paddingBlock: 8 }}>
                    <Typography>Asia-Pacific</Typography>
                  </Box>
                  <Box style={{ paddingBlock: 8 }}>
                    <Typography variant="caption" className={classes.cityName}>
                      Singapore
                    </Typography>
                    <Typography variant="caption">(+65) 6506 0690</Typography>
                  </Box>

                  <Box style={{ paddingBlock: 8 }}>
                    <Typography variant="caption" className={classes.cityName}>
                      Melbourne
                    </Typography>
                    <Typography variant="caption">(+613) 8415 8500</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box style={{ paddingBlock: 8 }}>
                <Typography>Global 24h Trading Number:</Typography>
              </Box>
              <Box style={{ paddingBlock: 8 }}>
                <Typography variant="caption">+1 866 666 2227</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box style={{ marginTop: -18 }}>
                <WorldMap />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
