import React from "react";
import { connect } from "react-redux";
import { setTitleFilter, sortByDate, sortByLike } from "../actions/filters";


export class ListFilters extends React.Component {
    state = {
      
    };

    
    onFocusChange = (calendarFocused) => {
      this.setState(() => ({ calendarFocused }));
    }
    onTitleChange = (e) => {
      this.props.setTitleFilter(e.target.value);
    };
    onSortChange = (e) => {
      if (e.target.value === 'date') {
        this.props.sortByDate();
      } else if (e.target.value === 'like') {
        this.props.sortByLike();
      }
    };
    render() {
      return (
        
            <div className="input-group">
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
                        value={this.props.filters.sortBy}
                        onChange={this.onSortChange}
                    >
                        <option value="date">Date</option>
                        <option value="like">Like</option>
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
    sortByDate: () => dispatch(sortByDate()),
    sortByLike: () => dispatch(sortByLike()),
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFilters);
  