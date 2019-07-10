import React,{Fragment} from 'react'

import axios from 'axios'


import Pagination from './Pagination'

class Render extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            data: null,
            active : 1,
            threeDotLast : false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/api/test-api').then(res =>{
           let data = res.data.data
            this.setState({
                data
            })
        })
    }

    renderData = (data) => {
        if(data){
            return data.data.map((item,index) => {
                return(
                    <a key={index} className="list-group-item list-group-item-action" href="">{item.city_name}</a>
                )
            })
        }
    }




    // threeDotLast = (data) => {
    //
    // }

    render(){
        let {data} = this.state
        return (
            <Fragment>
                <div className='container mt-5'>
                    <div  className="list-group">
                        {this.renderData(data)}
                    </div>
                    <Pagination
                        data={this.state.data}
                    />
                </div>
            </Fragment>
        )
    }
}


export default Render