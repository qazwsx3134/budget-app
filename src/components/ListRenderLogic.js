import React ,{ useEffect }from "react";
import ListView from "./ListView";
import ListQanda from "./ListQanda";
import ListEvent from "./ListEvent";
import ListFilters from "./ListFilters";
import FoodListFilters from "./FoodListFilters";
import QandaListFilters from "./QandaListFilters";
import Grid from '@material-ui/core/Grid';
import Footer from "./Footer";



export const ListRenderLogic =({ page, ...props })=> {
    switch(page) {
      case 'dashboard':
        return <div>dashboard</div>;

      case 'event':
        return (
          
          <Grid item xs={12} >
          
            <ListFilters/>

            <Grid container  spacing={2}>
              {
                (props.event.map((event) => {
                return <ListEvent key={event._id} {...event}{...props} />;
                }))
              }
            </Grid>
          <Footer/>
          </Grid>
        );
        case 'places':
          return (
          
          <Grid item xs={12} >
          
            <ListFilters/>

            <Grid container  spacing={2}>
              {
                (props.viewpoint.map((viewpoint) => {
                return <ListView key={viewpoint._id} {...viewpoint}{...props} />;
                }))
              }
            </Grid>
            <Footer/>
          </Grid>
        );
        case 'food':
          return (
          
            <Grid item xs={12} >
            
              <FoodListFilters/>
  
              <Grid container  spacing={2}>
                {
                  (props.food.map((food) => {
                  return <ListView key={food._id} {...food}{...props} />;
                  }))
                }
              </Grid>
              <Footer/>
            </Grid>
          );
      case 'qanda':
        return (
          
          <Grid item xs={12} >
          
            <QandaListFilters/>

            <Grid container  spacing={2}>
              {
                (props.qanda.map((qanda) => {
                return <ListQanda key={qanda._id} {...qanda}{...props} />;
                }))
              }
            </Grid>
            <Footer/>
          </Grid>
        );
      case 'error':
        return <Error text={text} />;
      default:
        return null;
    }
  }

