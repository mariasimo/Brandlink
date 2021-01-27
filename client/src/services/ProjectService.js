import axios from "axios";

class ProjectService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/project`,
      withCredentials: true,
    });
  }

  shareMessage = (data) => {
    const { email, projectId } = data;
    return this.instance
      .post("/send-email", { email, projectId })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  fetchProjects = () => {
    return this.instance
      .get("/")
      .then((res) => {
        // let arrData = Object.keys(res.data).map(key => {
        //   return res.data[key];
        // });
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  displayRows = (projectId) => {
    return this.instance
      .get(`/rows/${projectId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  displayProject = (userId) => {
    return this.instance
      .get(`/project/${userId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  // displayColorPalette = userId => {
  //   return this.instance.get(`/colorPalette/${userId}`)
  //   .then(res =>  {
  //     return Promise.resolve(res.data)
  //   })
  //   .catch(error => console.error(error));
  // }

  createProject = (project) => {
    return this.instance
      .post("/new", project)
      .then((res) => Promise.resolve(res.data))
      .catch((error) => console.error(error));
  };

  deleteProject = (projectId) => {
    return this.instance
      .delete(`/${projectId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  addColorToPalette = (updateProjectParams) => {
    const { name, hexadecimal, id, colorId } = updateProjectParams;
    return this.instance
      .put(`/color/${id}/${colorId}?`, { name, hexadecimal })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  getColorData = (colorId) => {
    return this.instance
      .get(`/color/${colorId}?`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  deleteColor = (colorId) => {
    return this.instance
      .delete(`/color/${colorId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  addTypeToTypeSet = (updateProjectParams) => {
    const { fontFamily, type, path } = updateProjectParams;
    return this.instance
      .put(`/type/${path}`, { fontFamily, type })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  deleteType = (typeId) => {
    return this.instance
      .delete(`/type/${typeId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  getGoogleFonts = () => {
    return this.instance
      .get("/getGoogleFonts")
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  uploadAsset = (fileParams) => {
    return this.instance
      .post(`/uploadAsset/${fileParams.path}`, fileParams.uploadData)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  deleteAsset = (assetId) => {
    return this.instance
      .delete(`/assets/${assetId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  addTextStyle = (updateProjectParams) => {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      uppercase,
      name,
      path,
      styleId,
    } = updateProjectParams;
    return this.instance
      .put(`/textStyle/${path}/${styleId}?`, {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        uppercase,
        name,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  getTextStyleData = (styleId) => {
    return this.instance
      .get(`/textstyle/${styleId}?`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  createNewRow = (rowParams) => {
    const { layout, userId } = rowParams;
    return this.instance
      .post(`/newRow/${userId}/`, { layout })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  deleteRow = (rowId) => {
    return this.instance
      .delete(`/rows/${rowId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => console.error(error));
  };

  addContent = (rowParams) => {
    const { rowId, slotIdx, type } = rowParams;
    return this.instance
      .put(`/rows/${rowId}`, { type, slotIdx })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  };

  addImageAsContent = (fileParams) => {
    return this.instance
      .post(`/rows/image`, fileParams.uploadData)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  };

  addDownloadAsContent = (fileParams) => {
    return this.instance
      .post(`/rows/download`, fileParams.uploadData)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  };

  fetchContent = (rowId) => {
    return this.instance.get(`/content/${rowId}`).then((res) => {
      return Promise.resolve(res.data);
    });
  };

  insertSlot = (content, rowId) => {
    return this.instance.put(`/content/${rowId}`, content).then((res) => {
      return Promise.resolve(res.data);
    });
  };
}

export default ProjectService;
