
import React ,{ useEffect }from "react";
import ListView from "./ListView";
import ListQanda from "./ListQanda";
import ListEvent from "./ListEvent";
import ListFilters from "./ListFilters";
import Grid from '@material-ui/core/Grid';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';


export const LabelIcon =({ page, ...props })=> {
    switch(page) {
      case 'dashboard':
        return (
            <IconButton >
                <FilterHdrIcon  />
            </IconButton>
        )
      case 'event':
        return (
          
          <Grid item xs={12} >
          
            <ListFilters/>

            <Grid container  spacing={2}>
              {
                (props.qanda.map((qanda) => {
                return <ListEvent key={qanda.id} {...qanda}{...props} />;
                }))
              }
            </Grid>
          
          </Grid>
        );

      case 'attraction':
        return (props.viewpoint.map((viewpoint) => {
            return <ListView key={viewpoint.id} {...viewpoint} {...props} />;
        }));
        case 'food':
          return (props.food.map((food) => {
              return <ListView key={food.id} {...food} {...props} />;
          }));
      case 'qanda':
          return (props.qanda.map((qanda) => {
            return <ListQanda key={qanda.id} {...qanda}{...props} />;
        }));
      case 'error':
        return <Error text={text} />;
      default:
        return null;
    }
  }

