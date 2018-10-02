import React, {PropTypes} from 'react';

class LoadingDot extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            frame:1
        }
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({
                frame : this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while(dots > 0){
            text += '.';
            dots--;
        }
        return(
            <span {...this.props}>&nbsp;{text}&nbsp;</span>
        );
    }
}

LoadingDot.defaultProps = {
    interval:300, 
    dots: 3
};

LoadingDot.proptypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingDot;