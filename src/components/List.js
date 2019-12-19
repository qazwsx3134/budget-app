import React ,{ useEffect }from "react";
import { connect,useDispatch,useSelector  } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation 
  } from "react-router-dom";
  import Grid from '@material-ui/core/Grid';
  import { setCityFilter,setTitleFilter, sortByDate, sortByAmount, sortByLike } from "../actions/filters";
import selectViewpoint from "../selectors/viewpoint.js";
import selectFood from "../selectors/food";
import selectQanda from "../selectors/qanda";
import selectEvent from "../selectors/event";
import { ListRenderLogic } from "./ListRenderLogic";
import ListView from "./ListView";
import { viewpoint,qanda,food,event } from "../store/store";
import { fetchViewpoints } from "../actions/viewpoint";
import { fetchQanda } from "../actions/qanda";
import { fetchFood } from "../actions/food";

// import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';



export const List = (props)=> {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCityFilter(props.city));
        
    },[]);

    useEffect(() => {
        dispatch(setCityFilter(props.city))
        return () => {
            dispatch(setCityFilter(''))
        };
      }, [props.city]);
    
    const sorting =(props)=>{
        if (props.page=="qanda") {
            dispatch(sortByDate())
        }else if (props.page=="food") {
            dispatch(sortByDate())
        } 
        else {
            dispatch(sortByLike())
        }
    }

      useEffect(() => {
        dispatch(setTitleFilter(''))
        sorting(props)
    }, [props.page]);
    
    return(
    <div className="content-container">
        <div className="list-body">
            <Grid container  spacing={0}>
                <Grid container justify="space-evenly" alignContent="center" spacing={1}>
                    <ListRenderLogic page={props.page} {...props}/> 
                    
                </Grid>
                
            </Grid>
        </div>
    </div>
)};

const mapStateToProps = (state)=>{
    return {
        viewpoint: selectViewpoint(state.viewpoint,state.filters), //用selector搭配filter去把state map 到 props
        filters: state.filters,
        qanda: selectQanda(state.qanda,state.filters),
        food: selectFood(state.food,state.filters),
        event: selectEvent(state.event,state.filters)
    };
}


const mapDispatchToProps = (dispatch) => ({
    fetchViewpoints: (viewpoint) => dispatch(fetchViewpoints(viewpoint)),
    fetchQanda: (qanda) => dispatch(fetchQanda(qanda)),
    fetchFood: (food)=> dispatch(fetchFood(food)),
    setCityFilter: (city) => dispatch(setCityFilter(city)),
    setTitleFilter: (title) => dispatch(setTitleFilter(title)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByLike: () => dispatch(sortByLike()),
    
  });
  

export default connect(mapStateToProps,mapDispatchToProps)(List); //前面放用arrow func return的object(從物件裡挑的) 後面放要連結的component 然後對於後面的component就能用props 擷取資料

