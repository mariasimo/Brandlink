import React from 'react'

export default class ProjectList extends React.Component {
    
    render() {
        const username = this.props.loggedInUser.username

        return (
            <div>
                Hola, {username}
            </div>
        )
    }
}
