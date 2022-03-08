import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { ReactComponent as MakorIcon } from '../../assets/icons/makorLogo.svg'
import { useSelector } from 'react-redux'

export default function Footer() {
  const userCategories = useSelector((state) => state.auth.userContent.categories)
  return (
    <footer style={{ position: 'relative' }}>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='black' color='white'>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box>
                <MakorIcon />
              </Box>
              <Box style={{ paddingBlock: 8 }}>
                <Link href='/' color='inherit'>
                  ABOUT US
                </Link>
              </Box>
              <Box style={{ paddingBlock: 8 }}>
                <Link href='/' color='inherit'>
                  TERMS OF USE
                </Link>
              </Box>
              <Box style={{ paddingBlock: 8 }}>
                <Link href='/' color='inherit'>
                  PRIVACY POLICY
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container>
                <Grid item xs={12}>
                  {' '}
                  YOUR CATEGORIES
                </Grid>
                {userCategories.map((category, index) => (
                  <Grid xs={12} style={{ paddingBlock: 8,fontSize: '13px' }}>
                    {' '}
                    {category.name.toUpperCase()}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>NEWSLETTER</Box>
              <Box style={{ fontSize: '13px' }}>Get updated on the latest publications by signing up to our newsletter</Box>
              <Box></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}
