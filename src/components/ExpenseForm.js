import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";


const now = moment();
console.log(now.format('YYYY MM Do'));
//isOutsideRange可以用來set 條件表示是否可以

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            description: props.expense ? props.expense.description : '',//如果props expense存在 代表 是edit傳下來的
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    onDescriptionChange = (e)=>{
        const description = e.target.value
        this.setState(()=>({description}))
    }
    onNoteChange = (e)=>{
        const note = e.target.value
        this.setState(()=>({note}))
    }
    onAmountChange =(e)=>{
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //前面的!是要讓別人可以清空欄位 use regex101 跑 regular expression 條件是 ^\d(從頭開始到尾的數字) +( \. + \d{0,2})? +$(結尾)
            this.setState(()=>({amount}))
        }
        
    };
    onDateChange = (createdAt)=>{ //moment為arguemnt
        
        if (createdAt) { //如果要強制有date就要丟進來
            this.setState(()=>({ createdAt }));
        }
    };
    onFocusChange = ({focused})=>{
        this.setState(()=>({calendarFocused: focused}))

    }
    onSubmit = (e)=>{
        e.preventDefault();//避免刷新
        
        if (!this.state.description || !this.state.amount) { //description amount 為必填項目
            this.setState(()=>({error: 'Please provide description and amount.'}))
        }else{
            this.setState(()=>({error: ''}))
            this.props.onSubmit({ //是page傳來的onSubmit 所以把我們要傳回的資料 包成object 然後這個component submit後 會觸發page傳的onSubmit 
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt : this.state.createdAt.valueOf(), //原本是moment object 要轉回成timestamp
                note: this.state.note
            })
        }
    };
    render () {
        return (             
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type = "text"
                    placeholder= "Description"
                    autoFocus
                    className="text-input" 
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    // type = "number"
                    type="text"
                    placeholder= "amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                    date = {this.state.createdAt}
                    onDateChange = {this.onDateChange}
                    focused = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={()=> false} 
                />
                <textarea
                    className="textarea"
                    placeholder="add a note for your expense(optional)"
                    onChange={this.onNoteChange}
                    value={this.state.note}
                ></textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
                
            </form>    
        )
    }
}