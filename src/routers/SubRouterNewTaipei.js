import React,{ useEffect } from "react";
import { connect,useDispatch  } from "react-redux";
import { withRouter } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from "../components/List";
import PixelPagePlaces from "../components/PixelPagePlaces";
import PixelPageFood from "../components/PixelPageFood";
import QandAPage from "../components/QandAPage";
import EventPage from "../components/EventPage";
import CreateQandaForm from "../components/CreateQandaForm";
import EditEventForm from "../components/EditEventForm";
import EditPlaceForm from "../components/EditPlaceForm";
import EditFoodForm from "../components/EditFoodForm";
import EditQandaForm from "../components/EditQandaForm";
import DashboardPage from "../components/DashboardPage";
import { apiFilteredGetPlace,apiFilteredGetFood,apiFilteredGetEvent,apiFilteredGetQanda } from "../api/api";
import { fetchViewpoints } from "../actions/viewpoint";
import { fetchFood } from "../actions/food";
import { fetchEvent } from "../actions/event";
import { fetchQanda } from "../actions/qanda";

//裝飾Button的style
const useStyles = makeStyles({
  button: {
    width: 120,
  },
});

//設定 id newtaipei 是根目錄 name是會顯示出來的string childs是會有哪些顯示出來的子連結
// -newtaipei
// --Places
// --Food
// --Q&A
const PEEPS = [
  { id: 'newtaipei', name: "newtaipei", childs: ['event','places', 'food', 'qanda'] },
  { id: 'event', name: "event", childs: ['event','places', 'food', 'qanda']},
  { id: 'places', name: "Places", childs: ['event','places', 'food', 'qanda'] },
  { id: 'food', name: "Food", childs: ['event','places', 'food', 'qanda'] },
  { id: 'qanda', name: "Q&A", childs: ['event','places', 'food', 'qanda'] }
];

function find(id) {
  return PEEPS.find(p => p.id == id);
}


export function SubRouterTaipei() {

  let { url } = useRouteMatch();
  let { id } = useParams();
  let person = find(id);
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect( () => {
    async function fetchData() {
      // You can await here
      const placeRes = await apiFilteredGetPlace('newtaipei')
      const foodRes = await apiFilteredGetFood('newtaipei')
      const eventRes = await apiFilteredGetEvent('newtaipei')
      const qandaRes = await apiFilteredGetQanda('newtaipei')

      dispatch(fetchViewpoints(placeRes.data))
      dispatch(fetchFood(foodRes.data))
      dispatch(fetchEvent(eventRes.data))
      dispatch(fetchQanda(qandaRes.data))
      
      // ...
    }
    if (id == 'newtaipei')
    {
      fetchData()
    }
    
      
      
  },[id]);

  if (id == 'newtaipei'){
  

    

  

  
  
    
  return (
    
    <div className="content-container">
      <div className="content-container">
          {person.childs.map((id)=>(
            <span key={id} >
            <Link className="button-link__sub__router" to={`${url}/${id}`}>
              <Button  
                component="span" 
                variant="outlined"
                color="secondary"
                className={classes.button}
                >
                  {find(id).name}
                </Button>
            </Link> 
            </span>
        ))}
      </div>
    
      <Switch>
        
        <Route 
          path={`${url}/event`} 
          exact={true}
          render={(props)=>(<List {...props} city={"newtaipei"} page={"event"}/>)}
          />
        <Route path={`${url}/event/:id`}

          render={(props)=>(
            <div>
              <EventPage {...props} city={"newtaipei"} page={"event"}/>
            </div>
          )}
          />

        <Route 
          path={`${url}/places`} 
          exact={true}
          render={(props)=>(<List {...props} city={"newtaipei"} page={"places"}/>)}
          />
        <Route path={`${url}/places/:id`}
          render={(props)=>(
            <div>
              <PixelPagePlaces {...props} city={"newtaipei"} page={"places"}/>
            </div>
              
          )}
          />

        
          
          
        <Route 
          path={`${url}/food`} 
          exact={true}
          render={(props)=>(<List {...props} city={"newtaipei"} page={"food"}/>)}
          />
        <Route path={`${url}/food/:id`}
          render={(props)=>(
            <div>
              <PixelPageFood {...props} city={"newtaipei"} page={"food"}/>
            </div>
          )}
          />
        
        <Route path={`${url}/qanda`}
        exact={true}
        render={(props)=>(<List {...props} city={"newtaipei"} page={"qanda"}/>)}
          />
        <Route path={`${url}/qanda/:id`} render={(props)=>(

              <QandAPage {...props} city={"newtaipei"} page={"qanda"}/>

          )} />
        <Route path={`${url}/postqanda`} render={(props)=>(<CreateQandaForm {...props} city={"newtaipei"} page={"qanda"}/>)} />

        <Route path={`${url}/edit/place/:id`} render={(props)=>(<EditPlaceForm {...props} city={"newtaipei"} page={"places"}/>)} />
        <Route path={`${url}/edit/food/:id`} render={(props)=>(<EditFoodForm {...props} city={"newtaipei"} page={"food"}/>)} />
        <Route path={`${url}/edit/event/:id`} render={(props)=>(<EditEventForm {...props} city={"newtaipei"} page={"event"}/>)} />
        <Route path={`${url}/edit/qanda/:id`} render={(props)=>(<EditQandaForm {...props} city={"newtaipei"} page={"qanda"}/>)} />
        <Route 
        path={`/newtaipei`} 
        exact={true}
        render={(props)=>(<DashboardPage {...props} city={"newtaipei"} page={"dashboard"}/>)}
        />


      </Switch>
      


    </div>
    
      

  );} return(null)
}

const mapStateToProps = (state)=>{
  return {
      viewpoint: state.viewpoint, 
      filters: state.filters,
      qanda: state.qanda,
      food: state.food,
      event: state.event,
      auth: state.auth
  };
}


export default withRouter(connect(mapStateToProps)(SubRouterTaipei));