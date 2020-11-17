import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { getAllFoods } from './foodService';

const Foods = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [display, setDisplay] = useState(false);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoods(getAllFoods())
  }, [])

  const foodsExist = foods && foods.length > 0;

  const displayClick = () => setDisplay(true);
  const hideClick = () => setDisplay(false);

  //with all the tests in place, it's easy breazy to refactor this with confidence
  return (
    <>
    { !display ? 
    <Button variant="contained" color="primary" className={classes.button} onClick={displayClick} data-testid="show">
      {t('foods.button.show')}
    </Button>
    :
    <Button variant="contained" color="primary" className={classes.button} onClick={hideClick} data-testid="hide">
      {t('foods.button.hide')}
    </Button>
    }
    { display &&
      <>
      { foodsExist ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="food table">
            <TableHead>
              <TableRow>
                <TableCell>{t('foods.tableHeaders.dessert')}</TableCell>
                <TableCell align="right">{t('foods.tableHeaders.calories')}</TableCell>
                <TableCell align="right">{t('foods.tableHeaders.fat')}</TableCell>
                <TableCell align="right">{t('foods.tableHeaders.carbs')}</TableCell>
                <TableCell align="right">{t('foods.tableHeaders.protein')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography variant="overline">{t('foods.noResults')}</Typography>
      }
      </>
    }
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}));

export default Foods;