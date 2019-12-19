import React from "react";
import { connect } from "react-redux";
import { setTitleFilter, setLabelFilter, sortByLike } from "../actions/filters";

 const labels = [
  {
    value: '',
  },
  {
    value: 'Animals-Allow',
  },
  {
    value: 'MidNight',
  },
  {
    value: 'Brunch',
  },
  {
    value: 'BreakFast',
  },
  {
    value: 'ChineseStyle',
  },
  {
    value: 'JapaneseStyle',
  },
  {
    value: 'KoreanStyle',
  },
  {
    value: 'ItalianFood',
  },
  {
    value: 'Desserts',
  },
  {
    value: 'VegetarianFood',
  },
  {
    value: 'FastFood',
  },
  {
    value: 'HotPot',
  },
  {
    value: 'SeaFood',
  },
  {
    value: 'High-End',
  },
  {
    value: 'café',
  },
  {
    value: 'GoodForDating',
  },
  {
    value: 'DimSum',
  },
  {
    value: 'AboriginalFood',
  },
  {
    value: 'Bar',
  },
  {
    value: 'AfternoonTea',
  },
]


export class ListFilters extends React.Component {
  
    state = {
      
    };

    
    
    onTitleChange = (e) => {
      this.props.setTitleFilter(e.target.value);
    };
    onSortChange = (e) => {
      this.props.setLabelFilter(e.target.value);
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
                        value={this.props.filters.label}
                        onChange={this.onSortChange}
                    >
                    {labels.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.value|| "All"}
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
    setLabelFilter: (label) => dispatch(setLabelFilter(label)),
    sortByLike: () => dispatch(sortByLike()),
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFilters);
  