import React, {Fragment} from 'react'


class Pagination extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            data : null,
            currentPaginate : [],
            lastPage : null,
            active : 1,
            lastThreeDot : false,
            firstThreeDot : false,
            limit : 10
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {}
        if (nextProps.data) {
            newState = {
                ...newState,
                data : nextProps.data,
                lastPage: nextProps.data.last_page
            }
        }
        if (nextProps.data && prevState.currentPaginate ==  0) {
            let currentPaginate = []
            for(let i = 1; i<= nextProps.data.last_page; i++){
                currentPaginate.push(i)
            }
            if (nextProps.data.last_page >= prevState.limit) {
                currentPaginate =  currentPaginate.filter(numbers => numbers <= prevState.limit);
                newState = {
                    ...newState,
                    lastThreeDot: true,
                    currentPaginate
                }
            }else{
                newState = {
                    ...newState,
                    lastThreeDot: false,
                    currentPaginate
                }
            }
        }
        if(prevState.currentPaginate.length > 0 && prevState.lastPage){
            let last = prevState.currentPaginate[prevState.currentPaginate.length -1]
            let first = prevState.currentPaginate[0]
            if(prevState.lastPage<= prevState.limit){
                newState = {
                    ...newState,
                    firstThreeDot: false,
                }
            }

            if(first != 1){
                newState = {
                    ...newState,
                    firstThreeDot: true,
                }
            }

            if(prevState.lastPage == last){
                newState = {
                    ...newState,
                    lastThreeDot: false,
                }
            }
        }

        return newState
    }

    onClickItem = (item) => {
        this.setState({
            ...this.state,
            active : item
        })
    }


    pagination = (currentPaginate) => {
        let {active} = this.state
        if(currentPaginate.length > 0){
            return currentPaginate.map((item) => {
                return (
                    <Fragment key={item}>
                        <li className={`page-item ${active === item ? "active" : ""}`}>
                            <a className={`page-link`} href={"#"+item} onClick={()=>this.onClickItem(item)}>{item}</a>
                        </li>
                    </Fragment>
                )
            })
        }
    }

    onClickLastThreeDot = () => {
        let {currentPaginate,lastPage,limit} = this.state
        let last = currentPaginate[currentPaginate.length - 1]
        if(lastPage >= last){
            let newCurrentPaginate = []
            for(let i= last; i< last + limit && i<=lastPage;i++){
                newCurrentPaginate.push(i)
            }
            this.setState({
                currentPaginate : newCurrentPaginate,
                // active : last,
                firstThreeDot:true
            },()=>{
                let {currentPaginate,lastPage} = this.state
                let last = currentPaginate[currentPaginate.length - 1]
                if(lastPage === last) {
                    this.setState({
                        lastThreeDot : false
                    })
                }
            })
        }

    }

    lastThreeDot = lastThreeDot => {
        if(lastThreeDot) {
            return (
                <li className="page-item" onClick={this.onClickLastThreeDot}>
                    <a className="page-link" href="#">...</a>
                </li>
            )
        }
    }

    onClickFirstThreeDot = () => {
        let {currentPaginate,limit} = this.state
        if(currentPaginate.length > 0){
            var first = currentPaginate[0];
            let newCurrentPaginate = [];
            console.log(first,'first')
            for(let i= first; i >= first - limit + 1 && i>0;i--){
                newCurrentPaginate.push(i)
            }
            newCurrentPaginate.sort((a, b) => a - b);
            this.setState({
                currentPaginate: newCurrentPaginate,
                    lastThreeDot: true
            },()=>{
                let {currentPaginate,lastPage} = this.state
                if(currentPaginate.length > 0){
                    var first = currentPaginate[0];

                    if(first == 1){
                        this.setState({
                            firstThreeDot : false
                        })
                    }
                }
            })
        }
    }

    firstThreeDot = (firstThreeDot) =>{
        if(firstThreeDot) {
            return (
                <li className="page-item" onClick={this.onClickFirstThreeDot}>
                    <span className="page-link">...</span>
                </li>
            )
        }
    }

    onClickNextPaginate = (active) => {
        let {lastPage,currentPaginate,limit} = this.state
        if(currentPaginate.length > 0){
            let last = currentPaginate[currentPaginate.length-1]
            console.log(limit,'limit')
            if(last == limit ){
                console.log('ml')
            }else{
                this.setState({
                    active: active + 1
                })
            }
        }

        // if(active < lastPage){
        //     this.setState({
        //         active : active + 1
        //     },()=>{
        //         let {currentPaginate,lastPage} = this.state
        //         var arraySum = currentPaginate.map((item) => {
        //             if(item <= lastPage){
        //                 return item + 1
        //             }
        //         })
        //         let last = arraySum[arraySum.length - 1]
        //         if(last <= lastPage){
        //             this.setState({
        //                 currentPaginate : arraySum
        //             })
        //         }
        //     })
        // }

    }

    nextPaginate = (active) => {
        return (
            <li className="page-item" onClick={()=>this.onClickNextPaginate(active)}>
                <a className="page-link" href="#">Next</a>
            </li>
        )
    }

    render(){
        let {firstThreeDot,lastThreeDot,currentPaginate,active} = this.state
        return (
            <React.Fragment>
                <nav className="mt-3">
                    <ul className="pagination">
                        {this.firstThreeDot(firstThreeDot)}
                        {this.pagination(currentPaginate)}
                        {this.lastThreeDot(lastThreeDot)}
                        {this.nextPaginate(active)}
                        {/*{this.threeDotLast(data)}*/}
                        {/*<li className="page-item disabled">*/}
                        {/*<span className="page-link">Previous</span>*/}
                        {/*</li>*/}
                        {/*<li className="page-item"><a className="page-link" href="">1</a></li>*/}
                        {/*<li className="page-item active">*/}
                        {/*<span className="page-link">*/}
                        {/*2*/}
                        {/*<span className="sr-only">(current)</span>*/}
                        {/*</span>*/}
                        {/*</li>*/}
                        {/*<li className="page-item"><a className="page-link" href="">3</a></li>*/}
                        {/*<li className="page-item">*/}
                        {/*<a className="page-link" href="#">Next</a>*/}
                        {/*</li>*/}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}


export default Pagination