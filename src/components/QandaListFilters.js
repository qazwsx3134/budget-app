import React from "react";
import { connect } from "react-redux";
import { setTitleFilter, setTopicFilter, sortByLike } from "../actions/filters";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';



 const labels = [
  {
    value: '',
  },
  {
    value: 'For-Sale',
  },
  {
    value: 'Question',
  },
  {
    value: 'Team-Up',
  },
  {
    value: 'Discussion',
  },
  {
    value: 'Chat',
  },
]


export class ListFilters extends React.Component {
  
    state = {
      
    };

    
    
    onTitleChange = (e) => {
      this.props.setTitleFilter(e.target.value);
    };
    onSortChange = (e) => {
      this.props.setTopicFilter(e.target.value);
    };
    render() {
      return (
        
            <div className="input-group">

            <Link className="button-link__qanda__router" to={`postqanda`}>
              <div className="input-group__item">
                  <Fab variant="extended" color="primary" aria-label="edit">
                    <EditIcon />
                    Ask Question
                  </Fab>
                </div>
            </Link>
              
              <div className="input-group__item">
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Use Me To Search"
                        value={this.props.filters.title}
                        onChange={this.onTitleChange}
                    />
                </div>
                <div className="input-group__item">
                    <select
                        className="select"
                        value={this.props.filters.topic}
                        onChange={this.onSortChange}
                    >
                    {labels.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.value||"All"}
                      </option>
                    ))}

                    </select>
                </div>
            
                
                
                
            </div>
        
      );
    }
  };
  
  const mapStateToProps = (state) => ({
    filters: state.filters
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (title) => dispatch(setTitleFilter(title)),
    setTopicFilter: (topic) => dispatch(setTopicFilter(topic)),
    sortByLike: () => dispatch(sortByLike()),
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFilters);
  