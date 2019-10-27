import { setTextFilter, sortByDate, sortByAmount ,setStartDate ,setEndDate } from "../../actions/filters";
import moment from "moment";

test('should start date set action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test('should end date set action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

test('should sortByDate action fire', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
    })
})

test('should sortByAmount action fire', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
    })
})

test('should setTextFilter action fire', () => {
    const text = 'Cool'
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text : 'Cool'
    })
})

test('should setTextFilter action fire', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text : ''
    })
})