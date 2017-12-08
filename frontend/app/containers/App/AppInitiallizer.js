import React, {Component} from 'react';

export default class AppInitializer extends Component {

    componentDidMount() {
        console.log('did mount');
        this.props.initialize();
    }

    render() {
        let {children, className, isInitialized} = this.props;
        if (isInitialized) {
            return <div className={className}>{children}</div>;
        } else {
            return <div>Loading...</div>;
        }
    }
}
