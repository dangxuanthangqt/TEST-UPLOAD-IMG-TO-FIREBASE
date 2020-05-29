import React from 'react';
import { render } from 'react-dom';
import { Formik } from "formik";
import yup from "yup";
import Dropzone from "react-dropzone";
import Recaptcha from "react-recaptcha";
//import { storage } from './configFirebase';
import Thumb from "./Thumb";
import { storage } from './configFirebase';
import { map } from 'lodash';
const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}

class App extends React.Component { 
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://www.google.com/recaptcha/api.js";
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);
  // }

  render() {
    return (
      <div className="container">
        <Formik
          initialValues={{
            name: "",
            email: "",
            images:[],
            attachments: [],
           
          }}
          onSubmit={(values) => {
            // let formData = new FormData();

            // formData.append("name", values.name);
            // formData.append("email", values.email);
            // formData.append("photo", values.photo);
            
            // for (let i = 0; i <= values.attachments.length; i++) {
            //   formData.append(`attachments[${i}]`, values.attachments[i]);
            // }
            console.log(values);

            // formData.append("recaptcha", values.recaptcha);

            // // you would submit with fetch for example
            // // const res = await fetch("posturl", { method: "POST", body: formData });
            // // Do whatever on the sever
            // alert("Form submitted!");
            // console.log(formData.get("name"));
            // console.log(formData.get("email"));
            // console.log(formData.get("photo"));
            //console.log(formData.get("recaptcha"));
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
           
          })}
          render={({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
            console.log(values.attachments)
            return (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" className="form-control"
                  value={values.name} onChange={handleChange} />
                {errors.name && touched.name && (
                  <p>{errors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label for="email">E-mail</label>
                <input id="email" name="email" type="email" className="form-control"
                  value={values.email} onChange={handleChange} />
                {errors.email && touched.email && (
                  <p>{errors.email}</p>
                )}
              </div>

              {/* <div className="form-group">
                <label for="photo">Photo</label>
                <input id="photo" name="photo" type="file" className="form-control"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }} />
              </div> */}

              <div className="form-group">
                <label>Multiple files</label>
                <Dropzone style={dropzoneStyle} accept="image/*" onDrop={ acceptedFiles => {
                  //if (acceptedFiles.length === 0) { return; }
                //   console.log("ngoai",acceptedFiles);
                 // map(acceptedFiles, acceptedFiles =>{
                //   // do nothing if no files
                // console.log(acceptedFiles);

                  //ACEPTED FILES tra ve ARAAY nen dung map hoac dung arr[0]

                    storage.ref('guests')
                    .child(acceptedFiles[0].name)
                    .put(acceptedFiles[0], {
                      contentType: acceptedFiles[0].type,
                    })
                    .then((snapshot)=>{
                     snapshot.ref.getDownloadURL().then( url =>{
                       console.log(url);
                       setFieldValue("images", values.images.concat(url));
                       setFieldValue("attachments", values.attachments.concat(acceptedFiles));
                     })
                    })

                    //return ;
                // })
                 
                  
                
                
                  
                
                
                 
                  
                  //if (acceptedFiles.length === 0) { return; }
                 
                  // on drop we add to the existing files
                  
                }}>
                  {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                      return "This file is authorized";
                    }

                    if (isDragReject) {
                      return "This file is not authorized";
                    }

                    if (values.attachments.length === 0) {
                      return <p>Try dragging a file here!</p>
                    }

                    return values.attachments.map((file, i) => (<Thumb key={i} file={file} />));
                  }}
                </Dropzone> 
              </div>



              <button type="submit" className="btn btn-primary">submit</button>
            </form>
          )}} />
      </div>
   
   );
  }
};

render(<App />, document.getElementById('root'));
