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
      .put(`/color/${path}/${colorId}?`, { name, hexadecimal })
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

  addTypeToTypeSet = updateProjectParams => {
    const { fontFamily, type, path } = updateProjectParams;
    console.log(fontFamily, type, path)
    return this.instance
      .put(`/type/${path}`, { fontFamily, type })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(error => console.error(error));
  };

  deleteType = (typeId) => {
    return this.instance.delete(`/type/${typeId}`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }

  getGoogleFonts = () => {
    console.log("service")
    return this.instance
      .get("/getGoogleFonts")
      .then(res => {
        console.log("back to service")
        console.log("res data")
        return Promise.resolve(res.data);
      })
      .catch(error => console.error(error));
  }

  uploadAsset = (fileParams) => {
    return this.instance.post(`/uploadAsset/${fileParams.path}`, fileParams.uploadData)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(error => console.error(error))
  }

  deleteAsset = (assetId) => {
    return this.instance.delete(`/assets/${assetId}`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }

  addTextStyle = updateProjectParams => {

    console.log("service")
    console.log(updateProjectParams)
    
    const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, uppercase, name, path, styleId } = updateProjectParams;
    return this.instance
      .put(`/textStyle/${path}/${styleId}?`, { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, uppercase, name })
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(error => console.error(error));
  };

  getTextStyleData  = (styleId) => {
    console.log("service")
    console.log(styleId)
    return this.instance.get(`/textstyle/${styleId}?`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }

  createNewRow = rowParams => {
    const {path, layout} = rowParams
    return this.instance
      .post(`/newRow/${path}`, {layout})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteRow = (rowId) => {
    console.log(rowId)
    return this.instance.delete(`/rows/${rowId}`)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(error => console.error(error));
  }


}

export default ProjectService;
