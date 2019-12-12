import axios from "axios";

class ProjectService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/project`,
      withCredentials: true
    });
  }

  fetchProjects = () => {
    return this.instance
      .get("/")
      .then(res => {
        let arrData = Object.keys(res.data).map(key => {
          return res.data[key];
        });
        return Promise.resolve(arrData);
      })
      .catch(error => console.error(error));
  };

  fetchOneProject = (projectPath) => {
    
    return this.instance.get(`${projectPath}`)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(error => console.error(error));
  };

  createProject = project => {
    return this.instance
      .post("/new", project)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteProject = projectId => {
    return this.instance
      .delete(`/${projectId}`)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(error => console.error(error));
  };

  addColorToPalette = updateProjectParams => {
    const { name, hexadecimal, path, colorId } = updateProjectParams;
    return this.instance
      .put(`/${path}/${colorId}?`, { name, hexadecimal })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(error => console.error(error));
  };

  getColorData  = (colorId) => {
    return this.instance.get(`/color/${colorId}?`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }


  deleteColor = (colorId) => {
    console.log("Service" + colorId)
    return this.instance.delete(`/color/${colorId}`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }

}

export default ProjectService;
