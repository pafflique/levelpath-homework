import * as R from 'ramda';
import React, {Fragment} from 'react';
import {Birth} from '../domain/birth';
import {Card, LinearProgress, List, ListDivider, ListItem, ListItemContent, Typography} from '@mui/joy';

interface BirthListProps {
  loading: boolean;
  list: Birth[];
}

function BirthList({loading, list}: BirthListProps) {
  function renderListItem(birth: Birth) {
    return (
      <ListItem key={birth.id}>
        <ListItemContent>
          <Typography noWrap>{birth.who}</Typography>
          <Typography level="body3">{birth.year}</Typography>
        </ListItemContent>
      </ListItem>
    );
  }

  function renderContent() {
    if (list.length > 0)
      return (
        <List>
          {R.addIndex<Birth>(R.map)((item, index) => (
            <Fragment>
              {index > 0 && <ListDivider/>}
              {renderListItem(item)}
            </Fragment>
          ), list)}
        </List>
      )
    else return <Typography level="body3">No data available</Typography>;
  }

  return (
    <Card variant="outlined">
      {loading ? <LinearProgress variant="soft"/> : renderContent()}
    </Card>
  );
}

export default BirthList;
