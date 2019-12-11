import React from 'react'

export default class ProjectList extends React.Component {
    constructor(props){
        super(props)

        //todo update this state later on with the new data
        this.state = {
            title: "",
            path: " "
        }
    }



    render() {
        const username = this.props.loggedInUser.username

        return (
            <div>
                Hola, {username}
                
            </div>
        )
    }
}
