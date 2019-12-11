import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Project extends Component {
    render() {

        const { project } = this.props 
        return (
            <div className="project-card card">
                <Link to={`/project/${project.path}`}><h2 className="title is-4 has-text-primary">{project.title}</h2></Link>
                <button className="button is-small is-rounded">Edit</button>
                <button className="button is-small is-rounded">Delete</button>
            </div>
        )
    }
}
